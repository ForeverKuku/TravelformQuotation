function travelApp() {
    return {
        showPhoneModal: false,
        agentPhone: '231887455714', 
        toast: {
            show: false,
            title: '',
            message: ''
        },

        // Client Form State
        form: {
            fullName: '',
            email: '',
            phone: '',
            travelDates: '',
            travelingFrom: '',
            travelingTo: '',
            preferredAirline: '',
            baggageAllowance: 'Standard Check-in (1x 23kg)',
            additionalNeeds: ''
        },

        initApp() {
            const savedPhone = localStorage.getItem('kalatravelstours_agent_phone');
            if (savedPhone) {
                this.agentPhone = savedPhone;
            }
            this.refreshIcons();
        },

        refreshIcons() {
            this.$nextTick(() => {
                if (window.lucide) {
                    lucide.createIcons();
                }
            });
        },

        triggerToast(title, message) {
            this.toast.title = title;
            this.toast.message = message;
            this.toast.show = true;
            setTimeout(() => {
                this.toast.show = false;
            }, 4000);
        },

        saveAgentPhone() {
            const clean = this.agentPhone.replace(/[^0-9]/g, '');
            this.agentPhone = clean;
            localStorage.setItem('kalatravelstours_agent_phone', clean);
            this.showPhoneModal = false;
            this.triggerToast('Settings Saved', 'Kalatravelstours WhatsApp number updated successfully.');
        },

        // Generate WhatsApp Text for Client Form
        buildClientWhatsAppMessage() {
            let msg = `🌴 *KALATRAVELSTOURS - QUOTATION REQUEST*\n`;
            msg += `=============================\n\n`;
            msg += `👤 *Full Name:* ${this.form.fullName}\n`;
            msg += `📧 *Email:* ${this.form.email}\n`;
            msg += `📞 *Phone:* ${this.form.phone}\n\n`;
            msg += `🛫 *Traveling From:* ${this.form.travelingFrom}\n`;
            msg += `🛬 *Traveling To:* ${this.form.travelingTo}\n`;
            msg += `📅 *Travel Dates:* ${this.form.travelDates}\n\n`;
            msg += `✈️ *Preferred Airline/Stays:* ${this.form.preferredAirline || 'No Preference'}\n`;
            msg += `🧳 *Baggage Allowance:* ${this.form.baggageAllowance}\n`;
            if (this.form.additionalNeeds) {
                msg += `📝 *Special Requirements / Extras:* ${this.form.additionalNeeds}\n`;
            }
            msg += `\n=============================\n`;
            msg += `Sent via Kalatravelstours Official Form`;
            return encodeURIComponent(msg);
        },

        submitClientForm() {
            const encodedMsg = this.buildClientWhatsAppMessage();
            const cleanPhone = this.agentPhone.replace(/[^0-9]/g, '');
            let url = cleanPhone 
                ? `https://wa.me/${cleanPhone}?text=${encodedMsg}`
                : `https://wa.me/?text=${encodedMsg}`;
            
            window.open(url, '_blank');
            this.triggerToast('Redirecting to WhatsApp', 'Opening WhatsApp to deliver your quote request to Kalatravelstours...');
        }
    };
}