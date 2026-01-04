import GithubButton from './GithubButton';

export default function Labels() {
  return (
    <div className="pages">
      <div className="pages_wrapper">
        {/* Welcome page */}
        <div id="welcome-section" className="page page--welcome">
          <span className="message--sub text-xl font-outfit tracking-[0.3em] text-neutral-400 mb-6">
            Aishwarya Muralirajan's 
          </span>
          <h1 className="message font-syncopate">
            THE
            <br />
            COAST CODE CLUB
          </h1>
          <p className="message--sub font-outfit max-w-xl">
            We're not here to make ordinary clothes. We're here to change the way fashion feels.
          </p>
        </div>

        {/* Second page */}
        <div id="second-section" className="page page--coca page--hidden">
          <span className="message--sub font-outfit tracking-[0.3em] text-neutral-400 mb-4">OUR PHILOSOPHY</span>
          <h2 className="message font-syncopate">Redefining <br />Fashion</h2>
          <p className="message--sub font-outfit max-w-md">
            Our brand was born out of the need for something different—clothing that doesn't follow the crowd, but sets its own rhythm. Every piece we create is curated to perfection, blending comfort with bold design, and innovation with individuality.
          </p>
        </div>

        {/* Third page */}
        <div id="third-section" className="page page--fanta page--hidden">
          <span className="message--sub font-outfit tracking-[0.3em] text-neutral-400 mb-4">WHAT WE STAND FOR</span>
          <h2 className="message font-syncopate">No Trends. <br />Just Truth.</h2>
          <p className="message--sub font-outfit max-w-md">
            We don't do mainstream. We don't chase trends. Instead, we craft styles that are unique, wearable, and unapologetically original—just like the people who wear them. Our collections are for the dreamers, the risk-takers, and the ones who aren't afraid to stand out.
          </p>
        </div>

        {/* Fourth page */}
        <div id="fourth-section" className="page page--sprite page--hidden">
          <span className="message--sub font-outfit tracking-[0.3em] text-neutral-400 mb-4">THE MOVEMENT</span>
          <h2 className="message font-syncopate">Being <br />Yourself</h2>
          <p className="message--sub font-outfit max-w-md">
            This is more than fashion. This is a movement to redefine casual wear into statements of identity. Because being ordinary is easy. Being yourself takes courage. And that's exactly what we design for.
          </p>
        </div>

        {/* Fifth page */}
        <div id="five-section" className="page page--end page--hidden flex justify-center items-center">
          <div className="w-full max-w-md text-center">
            <h2 className="message--sub font-outfit tracking-[0.2em] mb-8">CONNECT WITH US</h2>
            
            <a 
              href="mailto:aishwaryamuralirajan@gmail.com"
              className="block text-2xl font-outfit text-[#F7B980] hover:text-white transition-colors mb-8 break-words"
            >
              aishwaryamuralirajan@gmail.com
            </a>

            <div className="social-links font-outfit flex justify-center gap-6 text-sm">
              <a href="https://www.instagram.com" className="message--sub hover:text-white transition-colors clickable">
                INSTAGRAM
              </a>
              <a href="https://www.linkedin.com/in/" className="message--sub hover:text-white transition-colors clickable">
                LINKEDIN
              </a>
              <a href="https://www.threads.net/" className="message--sub hover:text-white transition-colors clickable">
                THREADS
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
