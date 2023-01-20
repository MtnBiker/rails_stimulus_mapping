import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

// enable Stimulus debug mode in development https://github.com/hotwired/stimulus/pull/354
// In Chrome console `Stimulus.debug = true` is an option to the following
application.debug = process.env.NODE_ENV === 'development'
