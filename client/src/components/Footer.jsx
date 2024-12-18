import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsTiktok } from 'react-icons/bs';
// import Logo from '../assets/sm-logo.svg';

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
  <div className="w-full max-w-7xl mx-auto">
    <div className="grid w-full justify-between sm:flex md:grid-cols-1">
      <div className="mt-5 text-center sm:text-left">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-2xl sm:text-2xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 rounded-lg text-white">
            Shahmy's
          </span>{" "}
          Blog
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-10 sm:mt-5 mt-10 sm:grid-cols-3 sm:gap-6">
        <div>
          <Footer.Title title="Contact Info" />
          <Footer.LinkGroup col>
            <Footer.Link href="#">shahmyahamed
              @gmail.com</Footer.Link>
            <Footer.Link href="#">+94 77 585 8547</Footer.Link>
            <Footer.Link href="#">Balangoda, Sri Lanka</Footer.Link>
          </Footer.LinkGroup>
        </div>

        <div>
          <Footer.Title title="Quick Links" />
          <Footer.LinkGroup col>
            <Footer.Link href="/" target="_blank" rel="noopener noreferrer">
              Home
            </Footer.Link>
            <Footer.Link href="/about" target="_blank" rel="noopener noreferrer">
              About
            </Footer.Link>
            <Footer.Link href="/search" target="_blank" rel="noopener noreferrer">
              Blog Posts
            </Footer.Link>
          </Footer.LinkGroup>
        </div>

        <div className="mt-1">
        <Footer.Title title="Location Map" />
          <div className="mt-4 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126750.34939293889!2d80.66513030000001!3d6.6557599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae32183ae362469%3A0x8b891d02dce7caa3!2sBalangoda%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
              className="rounded-lg"
            ></iframe>
          </div>
      </div>


      </div>
    </div>
    <Footer.Divider />
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
      {/* Logo */}
      <div className="mb-4 sm:mb-0">
        <Footer.Copyright
          href="/"
          by="Shahmy's blog. All Rights Reserved."
          year={new Date().getFullYear()}
        />
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 justify-center sm:justify-start sm:mt-0 mt-4">
        <Footer.Icon
          href="https://facebook.com/shahmy.ahamed1"
          icon={BsFacebook}
          target="_blank"
          rel="noopener noreferrer"
        />
        <Footer.Icon
          href="https://www.instagram.com/shahmy.ahamed1?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          icon={BsInstagram}
          target="_blank"
          rel="noopener noreferrer"
        />
        <Footer.Icon
          href="https://twitter.com/ShahmyAhamed3?t=1ciompCY_sNtQNDtW3pAkA&s=09"
          icon={BsTwitter}
          target="_blank"
          rel="noopener noreferrer"
        />
        <Footer.Icon
          href="https://tiktok.com/@shahmy.ahamed?_t=8lRUKkAFxVh&_r=1"
          icon={BsTiktok}
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </div>
  </div>
</Footer>

  );
}
