import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header>
        <h1>Haz's Portfolio</h1>
        <nav>
          <ul>
            <li>About Haz</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <div className="stage">
            <div className="card" id="card">
              <div className="layer layer-back">背景</div>
              <div className="layer layer-mid">中景</div>
              <div className="layer layer-front">前景</div>
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
}
