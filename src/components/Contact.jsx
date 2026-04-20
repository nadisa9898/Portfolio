export default function Contact() {
  return (
    <section id="contact" className="max-w-[1170px] mx-auto px-4 md:px-0 mt-37">
      <h2 className="text-[40px] md:text-[60px] font-semibold font-last-shuriken tracking-[0]">CONTACT ME</h2>

      <div className="grid md:grid-cols-2 items-center md:gap-16">
        <div className="hidden md:block">
          <img src="/images/contactMeLeft.png" className="h-[373px]" alt="Contact Illustration" />
        </div>

        <div className="flex justify-center md:justify-self-end">
          <img src="/images/QRCode.png" className="w-60 md:w-80" alt="QR Code" />
        </div>
      </div>
    </section>
  );
}
