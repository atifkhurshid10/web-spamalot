const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  // Any object with subject and recipient properties can be passed to constructor
  constructor({ subject, recipients }, content) {
    super(); // Calling superclass's constructor

    this.sgAPI = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@spamalot.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
    // Creating these variables is not enough, we need to call the functions
    // defined below to put the settings into effect

    // helper.Mail built-in function
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  // recipients is an array of mongodb objects of the form {email: abc@xyz.com}
  // formatAddresses converts each object in array into helper.Email objects
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    // helper.Mail built-in function
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    // Create Personalize object, add all recipient email objects to it
    // and finally add personalize object to the Mailer Class
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    // helper.Mail built-in function
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgAPI.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgAPI.API(request);
    return response;
  }
}

module.exports = Mailer;
