'use client'

import EmailSubscription from './EmailSubscription'

export default function NewsletterSection() {
  return (
    <section className="w-full py-16 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Stay Updated
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Get the latest updates about SummerHacks, including announcements,
          deadlines, and exclusive content delivered straight to your inbox.
        </p>

        <div className="max-w-md mx-auto">
          <EmailSubscription
            placeholder="Enter your email address"
            buttonText="Join Newsletter"
            className="w-full"
          />
        </div>

        <p className="text-sm text-gray-500 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
