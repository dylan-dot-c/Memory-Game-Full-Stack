import {useContext} from "react";
import FooterContext from "../contexts/FooterContext";


function Footer() {

  const context = useContext(FooterContext)
  return (
    <footer className={`bg-black text-center w-full text-white py-4 ${context.showFooter ? 'block': 'hidden'}`}>
      <p>
        Made with ❤️‍ and 🧠 and 🙏 by{" "}
        <a href="https://www.linkedin.com/in/dylan-heslop-7223b0186/">
          Dylan Heslop
        </a>
        .{" "}
      </p>
      <p>
        <a
          href="https://www.flaticon.com/free-icons/memory"
          title="memory icons"
        >
          Memory icons created by Freepik - Flaticon
        </a>
      </p>
    </footer>
  );
}

export default Footer;
