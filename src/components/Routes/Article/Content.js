/* eslint-disable quotes */
export const content = {
  page: {
    includeCta: true,
    content: `
    <h1>What is BuzzFit?</h1>
    <p><strong>Buzz Fit is the number 1 entertainment system for a medical waiting room.</strong> In conjunction, with our partnership with Buzz Fit, Buzz Fit will ensure that any script that you write will play in your waiting room every 20 mins increasing your authority amongst your patients which in turn will increase recommendations with patients and your professional reputation in your office. There are 2 ways to proceed: either you can donate to The Better Foundation which in addition will play an advert to show your generous support or Purchase the Buzz Fit Device. </p>
    `,
  },
  actions: {
    buttons: [
      { iconLeft: 'wallet', to: '/', text: 'Purchase a Device' },
      { iconLeft: 'donate', text: 'Donate to The Better Foundation', to: '/' },
    ],
  },
  documents: {
    title: 'Documentation',
    list: [
      { id: 1, label: 'View your verification document', file: 'test.pdf' },
      { id: 2, label: 'View your certification as a healthcare writer', file: 'test.pdf' },
    ],
  },
};
