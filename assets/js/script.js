document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll("nav ul li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
      // For other links (like notifications.html), the default behavior (navigation) will occur.
    });
  });

  // Optional: Add an effect when the CTA button is clicked
  const ctaButtons = document.querySelectorAll(".cta-button");
  ctaButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // For a real site, you might navigate, show a modal, etc.
      console.log("Call to action button clicked!");
      // alert('Thank you for your interest!'); // Could show a simple alert
    });
  });
});
