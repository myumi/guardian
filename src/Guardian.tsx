import { createContext, useState } from 'react';
import Header from './components/Header';
import MatchMaking from './components/matchmaking/MatchMaking';
import BreedingCalculator from './components/breeding/BreedingCalculator';
import './styles/Guardian.scss';
import FAQ from './components/faq/FAQ';
import GeneSelect from './components/GeneSelect';
export default function Guardian() {
  const [page, setPage] = useState(0);
  const [settings, openSettings] = useState(false);

  return (
    <div id="guardian">
      <Header setPage={(value: number) => setPage(value)}/>
      <main>
        {
          settings
          && ''
        }

        {
          page === 0 
          && <BreedingCalculator />
        }

        {
          page === 1 
          && <MatchMaking />
        }

        {
          page === 2
          && <FAQ />
        }
        <div id="guardian__credits">made with love, by <a href="https://flightrising.com/main.php?p=lair&tab=userpage&id=192868">@breathe</a></div>
      </main>
    </div>
  );
}