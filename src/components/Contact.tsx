export default function Contact() {
    return (
      <footer id="Contact" className="bg-background text-foreground py-8 border-t border-gray-700">
        <div className="w-full mx-auto flex flex-row md:flex-row items-center justify-between gap-4 md:gap-0 px-12 sm:px-16">
          <div className="flex flex-col md:flex-row gap-2 sm:gap-6 self-start">
            <a
              href="https://www.linkedin.com/in/hadiahmad06"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-400 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/hadiahmad06"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-400 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://instagram.com/aidahdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-400 hover:underline"
            >
              Instagram
            </a>
            <a
              href="https://x.com/aidahdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-gray-400 hover:underline"
            >
              {"X (Twitter)"}
            </a>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <a
              href="mailto:hadi.ahmad.1709@icloud.com"
              className="text-gray-400 hover:underline"
            >
              hadi.ahmad.1709@icloud.com
            </a>
            <a
              href="mailto:ahmad287@umn.edu"
              className="text-gray-400 hover:underline"
            >
              ahmad287@umn.edu
            </a>
          </div>
        </div>
      </footer>
    );
  }