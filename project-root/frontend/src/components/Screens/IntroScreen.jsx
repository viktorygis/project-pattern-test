
//src/components/Screens/IntroScreen.jsx
import React from 'react';
import OfferIntroSection from '../Sections/IntroSections/OfferIntroSection';
import PatternsIntroSection from '../Sections/IntroSections/PatternsIntroSection';
import InstructionIntroSection from '../Sections/IntroSections/InstructionIntroSection';
import ContactsIntroSection from '../Sections/IntroSections/ContactsIntroSection';
import StartTestIntroSection from '../Sections/IntroSections/StartTestIntroSection';

const IntroScreen = () => {
  return (
    <div>
      <OfferIntroSection />
      <PatternsIntroSection />
      <InstructionIntroSection />
      <ContactsIntroSection />
      <StartTestIntroSection />
    </div>
  );
};

export default IntroScreen;