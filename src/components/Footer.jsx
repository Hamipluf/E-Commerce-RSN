import React from "react";

import Link from "next/link";
import Image from "next/image";

import phone from "../../public/smartphone.png";

export default function Footer() {
  return (
    <>
      <div>
        <footer className="footer p-10 bg-base-200 text-base-content">
          <div>
            <Image width={80} height={80} src={phone} alt="LOGO" />
            <p>
              ACME Industries Ltd.
              <br />
              Providing reliable tech since 1992
            </p>
          </div>
          <div>
            <span className="footer-title">Services</span>
            <Link href="#">Branding</Link>
            <Link href="#">Design</Link>
            <Link href="#">Marketing</Link>
            <Link href="#">Advertisement</Link>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <Link href="#"></Link>
            About us
            <Link href="#">Contact</Link>
            <Link href="#">Jobs</Link>
            <Link href="#">Press kit</Link>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <Link href="#">Terms of use</Link>
            <Link href="#">Privacy policy</Link>
            <Link href="#">Cookie policy</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
