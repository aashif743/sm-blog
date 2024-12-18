import CallToAction from '../components/CallToAction';

export default function Contact() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-6">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-center my-8">Contact Me</h1>
                    
      <p className="text-center text-gray-400">
        I’d love to hear from you! Whether you have questions, feedback, or suggestions, feel free to reach out using any of the following methods:
      </p>

      {/* Contact Information */}
      <div className="w-full flex flex-col gap-6 text-gray-500">
        {/* Email */}
        <div className="flex items-center gap-6">
          <i className="fas fa-envelope text-2xl text-blue-500"></i>
          <div>
            <h3 className="font-semibold text-lg">Email</h3>
            <p className="text-gray-400">shahmyahamed@gmail.com</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-6">
          <i className="fas fa-phone text-2xl text-green-500"></i>
          <div>
            <h3 className="font-semibold text-lg">Phone</h3>
            <p className="text-gray-400">+94 77 585 8547</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-6">
          <i className="fas fa-map-marker-alt text-2xl text-red-500"></i>
          <div>
            <h3 className="font-semibold text-lg">Location</h3>
            <p className="text-gray-400">Balangoda, Sri Lanka</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="w-full flex flex-col gap-4">
          <h3 className="text-center font-semibold text-lg">Follow Me</h3>
          <div className="flex justify-center gap-10 text-gray-700">
            {/* YouTube Link */}
            <a
              href="https://www.youtube.com/@smarteducationtamil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <i className="fab fa-youtube text-3xl text-red-500"></i>
            </a>

            {/* Facebook Link */}
            <a
              href="https://facebook.com/shahmy.ahamed1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <i className="fab fa-facebook text-3xl text-blue-700"></i>
            </a>

            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/shahmy.ahamed1?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <i className="fab fa-instagram text-3xl text-pink-500"></i>
            </a>

            {/* Twitter/X Link */}
            <a
              href="https://twitter.com/ShahmyAhamed3?t=1ciompCY_sNtQNDtW3pAkA&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <i className="fab fa-x-twitter text-3xl text-gray-800"></i>
            </a>

            {/* TikTok Link */}
            <a
              href="https://tiktok.com/@shahmy.ahamed?_t=8lRUKkAFxVh&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <i className="fab fa-tiktok text-3xl text-black"></i>
            </a>
          </div>
        </div>

      </div>

      {/* Call To Action */}
      <div className="mt-6 w-full">
        <CallToAction />
      </div>
    </div>
  );
}
