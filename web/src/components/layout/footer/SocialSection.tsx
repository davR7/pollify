import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export function SocialSection() {
  return (
    <nav className="flex items-center gap-4">
      <a href="https://github.com" aria-label="GitHub">
        <FaGithub size={25} />
      </a>

      <a href="https://linkedin.com" aria-label="LinkedIn">
        <FaLinkedin size={25} />
      </a>

      <a href="https://instagram.com" aria-label="Instagram">
        <FaInstagram size={25} />
      </a>

      <a href="https://facebook.com" aria-label="Facebook">
        <FaFacebook size={25} />
      </a>

      <a href="https://youtube.com" aria-label="YouTube">
        <FaYoutube size={25} />
      </a>

      <a href="https://x.com" aria-label="X">
        <FaXTwitter size={25} />
      </a>
    </nav>
  );
}
