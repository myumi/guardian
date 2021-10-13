// import '../../styles/FAQ.scss';

export default function Guardian() {
  return (
    <section id="faq">
      <p>
        Hi! 
        Thank you for checking out the web application Guardian. 
        I made this for players of the web-based dragon breeding game <a href="https://flightrising.com">Flight Rising</a>. 
        The application itself is named after a popular dragon breed in the game.
        If you somehow found your way here and don't play Flight Rising... well, you'll definitely have no use for this!
        If you'd like to see what Flight Rising is all about, feel free to <a href="https://www1.flightrising.com/registration/start">sign up with my referral code (Breathe)</a>. Thanks!
      </p>

      <h1>How do I use this?</h1>
      <p>The tabs at the top of the screen represent the Breeding Calculator, Matchmaking Planner, FAQ, and Settings tab.</p>
      <p>
        The Breeding Calculator is intended to be used to display the probabilities of getting a specific offspring with a specific pair.
        This includes color probability based on the in-game color wheel, dragon breed outcomes, gene outcomes, and sex.
        The only aspect that depends on breeding is color, as this cannot be changed in any predictable way in-game.
        However, I know many users also try to breed for the other outcomes as well, and the outcomes can easily be screenshot for hatcheries or pair pages.
        It's best to use the Breeding Calculator if you have a specific pair in mind and want to see all of the pair's potential offspring possibilities in a single location.
      </p>
      <p>
        The Matchmaking Planner is a more complex version of the Breeding Calculator.
        Its most common use is when you have a specific outcome in mind and a bunch of potential parents.
        You can input each mother and father, as well as the hopeful outcome you are striving for. Once you click "Calculate Lineage" you will get lists of what pairs of parents are most likely to provide the outcome you'd like.
        This is currently limited just to color. I may plan to add the other properties, but that would get so complex to the point of being nearly useless with some of the percentages you're bound to get.
        I may do it just for the novelty anyway, but if you want my unsolicited advice, just scroll and gene the baby lol.
      </p>
      <p>
        The FAQ tab is where you are now!
      </p>
      <p>
        The settings menu will open up some settings, mostly aesthetic things like light/dark mode, text alignment, borders, etc. 
        You can also change how hard the numbers are rounded and turn off the auto scrolling feature in this tab.
        These will *not* retain if you leave or refresh the page (yet).
      </p>

      <h1>Is this an offical Flight Rising application?</h1>
      <p>No. It is purely fanmade, by me.</p>

      <h1>Something is not working!</h1>
      <p>
        As of right now (October 2021) some pieces of the application are still in development.
        If the issue is not listed in the README of the project, please let me know. If it is, then I'm currently working on adding or fixing it!
      </p>

      <h1>Can I contribute to this project?</h1>
      <p>Absolutely!</p>
      <p>If you're a developer feel free open an issue or make a pull request on <a href="https://github.com/myumi/guardian">the repository for this project on Github</a>.</p>
      <p>If you're a designer, feel free to PM in-game or send me an email which is listed on <a href="https://github.com/myumi">my GitHub profile</a> with 'Guardian Design' in the title of the email.</p>
      <p>Please note that I may not accept the changes you request or build for various reasons, but I am open to most improvements.</p>
      <p>If you are neither of those but still want to help out, you can fund this project with <a>Ko-Fi donations</a> (hosting and such is not cheap) or by <a href="https://www1.flightrising.com/lair/192868/2018561?name=&type=undefined">buying my hatchlings</a>.</p>
    </section>
  );
};