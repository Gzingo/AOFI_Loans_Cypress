import { getRecordedTimestamp, getRecordedTimestampPlusYears } from '../dateUtils';

export class TestData {
  proposalDraftApplicantNameTubeIQ() {
    return 'QATesting';
  }

  proposalDraftApplicantMBTubeIQ() {
    return '16859722';
  }

  proposalDraftApplicantPIBTubeIQ() {
    return '776185205';
  }

  proposalDraftApplicantAddressTubeIQ() {
    return 'adresaPrva';
  }

  proposalDraftSelectedProductTubeIQ() {
    return 'Kratkoročni kredit sa planom otplate';
  }

  proposalDraftLoanAmountTubeIQ() {
    return '420.002';
  }

  creditLoanAmountInputTubeIQ() {
    return '420002';
  }

  creditLoanAmountTextInputTubeIQ() {
    return 'Četiri stotine dvadeset hiljada i dva';
  }

  proposalDraftCurrencyTubeIQ() {
    return 'EUR';
  }

  proposalDraftPeriodTubeIQ() {
    return '12';
  }

  proposalLoanInstallmentNumberTubeIQ() {
    return '12';
  }

  proposalCourseTypeTubeIQ() {
    return 'Tip kursa';
  }

  proposalDueDateTubeIQ() {
    return '60 months (5 years)';
  }

  bankAccountNumberTubeIQ() {
    return '160-5500123456-78';
  }

  proposalInterestRateTubeIQ() {
    return '10%, fixed installment';
  }

  proposalPaymentMethodTubeIQ() {
    return [
      '- Monthly installments according to the annuity plan',
      '- Automatic payment through the bank',
      '- Possibility of early repayment without penalty',
    ].join('\n');
  }

  proposalApplicantExposureDateTubeIQ() {
    return '03.02.2025';
  }

  decisionIODateTubeIQ() {
    return '26.01.2026';
  }

  decisionIONumberTubeIQ() {
    return 'IO-025/2026';
  }

  riskOpinionApprovalDateTubeIQ() {
    return getRecordedTimestamp();
  }

  riskOpinionDueDateTubeIQ() {
    return getRecordedTimestampPlusYears(5);
  }

  proposalOneTimeFeeAmountTubeIQ() {
    return '2% administrative fee';
  }

  proposalSpecialConditionsTubeIQ() {
    return 'Approved grace period of 6 months';
  }

  proposalRatingTubeIQ() {
    return 'Internal rating: B+ (stable, with growth potential) - Category: low-risk client with growing export potential';
  }

  proposalExposureTubeIQ() {
    return [
      '- Total exposure to foreign customers: EUR 250,000',
      '- Currently active: 125,000 EUR',
      '- Remaining limit: 125,000 EUR',
    ].join('\n');
  }

  collateralPlacementPurposeTextTubeIQ() {
    return 'Automation test AOFI credit request legal entity (Financing of working capital to increase the capacity of production and export of mushrooms to the EU market)';
  }

  applicantDirectorName() {
    return 'QATest Director';
  }

  riskOpinionRequestJustificationTubeIQ() {
    return 'Automation test AOFI loan request legal entity';
  }

  collateralSecurityInstrumentsTextTubeIQ() {
    return [
      '- Company promissory note (Menica preduzeća)',
      '- Guarantee (Garancija)',
      '- Deposit (Depozit)',
      '- Bank guarantee (Garancija banke)',
    ].join('\n');
  }

  collateralExportDataCommentTextTubeIQ() {
    return [
      '- Buyer: Hellenic Import T.E.S.T.',
      '- Cooperation: Since 2015 with stable dynamics of orders',
      '- Planned increase in exports',
    ].join('\n');
  }

  collateralBriefSectorAnalysisTextTubeIQ() {
    return [
      'Production, marketing, and sale of mushrooms:',
      '- The mushroom market in the EU records a stable growth of ~5% per year',
      '- Demand is highest in the HoReCa sector (hotels, restaurants, catering)',
      '- Competition in the region is moderate, with several larger producers in Poland and Hungary',
      '- The advantage of domestic manufacturers is flexibility and fast delivery',
    ].join('\n');
  }

  collateralStrengthSWOTTextTubeIQ() {
    return '1. Product quality,  2.Organic production certificates,  3. Long-term cooperation with customers';
  }

  collateralWeeknesSWOTTextTubeIQ() {
    return '1. Limited cold storage capacity,  2. Lack of brand in the EU market';
  }

  collateralOpportunitiesSWOTTextTubeIQ() {
    return '1. Expansion to new markets (Germany,Austria),  2. Introduction of new products (Dried mushrooms, Homeopathic products, Production of supplements)';
  }

  collateralThreatsSWOTTextTubeIQ() {
    return '1. Changes in EU regulations,  2. Increase in transport costs';
  }

  collateralLiquidityBlockageDaysTextTubeIQ() {
    return 'Short-term liquidity ratio: 1.4 (satisfactory level) - Cash flows are stable, with seasonal fluctuations in Q2 and Q4 - Blockage days: 0 (no recorded blockages)';
  }

  collateralCommentKBTextTubeIQ() {
    return [
      '- There are no recorded delays in the repayment of obligations',
      '- Credit history in order, without negative items',
      '- Assessed as a low-risk client',
      '- Need to provide additional capital for export growth',
    ].join('\n');
  }

  collateralCooperationAOFITextTubeIQ() {
    return 'There is no previous cooperation';
  }

  collateralBalanceSheetTextTubeIQ() {
    return [
      '- Total assets: EUR 2.8 million',
      '- Structure: 60% current assets, 40% fixed assets',
      '- Capital: EUR 1.5 million',
      '- Liabilities: EUR 1.3 million (mostly short-term)',
    ].join('\n');
  }

  collateralIncomeStatementTextTubeIQ() {
    return [
      '- Revenues in 2024: 1.2 million EUR (12% growth compared to 2023)',
      '- Net profit: EUR 95,000',
      '- EBITDA margin: 14%',
    ].join('\n');
  }

  collateralFutureCashFlowsTextTubeIQ() {
    return [
      '- Projection for 2025: revenue growth 15%, expected net profit EUR 120,000',
      '- Cash flows are positive, but depend on seasonal exports',
      '- Planned increase in exports by 20% in the coming two years',
    ].join('\n');
  }

  collateralRatingTextTubeIQ() {
    return 'Internal rating: B+ (stable, with growth potential) - Category: low-risk client with growing export potential';
  }

  collateralConclusionTextTubeIQ() {
    return [
      '- The company is engaged in the production and export of mushrooms, with stable financial indicators and long-term cooperation with customers in the EU',
      '- The necessary funds are intended for the expansion of capacity and the strengthening of exports',
      '- The risk is low, and the growth potential is significant',
      '- Recommendation: approve credit placement',
    ].join('\n');
  }

  creditRequestCommentDptHeadTubeIQ() {
    return 'Automated Test Comment - Credit Request ready for Credit advisor.';
  }

  creditRequestCommentCreditAdvisorTubeIQ() {
    return 'Automated Test Comment - Credit Request ready for further processing.';
  }

  mandatoryAttachmentsTubeIQ() {
    return [
      '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
      '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
      '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
      '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
      '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
      '7. OP obrazac.pdf',
      '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
      '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
      '10. Bilans stanja.pdf',
      '11. Bilans uspeha.pdf',
      '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
      '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
      '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
      '21. Analitičke kartice kupaca i dobavljača.pdf',
      '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
    ];
  }

  completeCreditProposalDocumentationTubeIQ() {
    return {
      KreditniPredlog: ['KreditniProcesKreditiPredlog.docx'],
      Dokumentacija: [
        '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
        '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
        '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
        '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
        '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
        '7. OP obrazac.pdf',
        '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
        '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
        '10. Bilans stanja.pdf',
        '11. Bilans uspeha.pdf',
        '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
        '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
        '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
        '21. Analitičke kartice kupaca i dobavljača.pdf',
        '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
      ],
    };
  }

  completeRequestForwardingDocumentationTubeIQ() {
    return {
      KreditniPredlog: ['KreditniProcesKreditiPredlog.docx'],
      OsnovniUslovi: ['OsnovniUsloviNovo.docx'],
      Dokumentacija: [
        '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
        '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
        '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
        '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
        '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
        '7. OP obrazac.pdf',
        '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
        '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
        '10. Bilans stanja.pdf',
        '11. Bilans uspeha.pdf',
        '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
        '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
        '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
        '21. Analitičke kartice kupaca i dobavljača.pdf',
        '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
      ],
    };
  }

  completedRiskOpinionDocumentationTubeIQ() {
    return {
      PredlogOdluke: ['PredlogOdlukeNovo.docx'],
      KreditniPredlog: ['KreditniProcesKreditiPredlog.docx'],
      OsnovniUslovi: ['OsnovniUsloviNovo.docx'],
      Dokumentacija: [
        '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
        '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
        '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
        '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
        '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
        '7. OP obrazac.pdf',
        '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
        '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
        '10. Bilans stanja.pdf',
        '11. Bilans uspeha.pdf',
        '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
        '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
        '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
        '21. Analitičke kartice kupaca i dobavljača.pdf',
        '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
      ],
    };
  }

  completedRiskOpinionVerificationDocumentationTubeIQ() {
    return {
      RiskMisljenje: ['Risk mišljenje.docx'],
      OsnovniUslovi: ['OsnovniUsloviNovo.docx'],
      PredlogOdluke: ['PredlogOdlukeNovo.docx'],
      KreditniPredlog: ['KreditniProcesKreditiPredlog.docx'],
      Dokumentacija: [
        '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
        '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
        '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
        '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
        '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
        '7. OP obrazac.pdf',
        '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
        '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
        '10. Bilans stanja.pdf',
        '11. Bilans uspeha.pdf',
        '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
        '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
        '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
        '21. Analitičke kartice kupaca i dobavljača.pdf',
        '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
      ],
    };
  }

  completedRiskOpinionIODecisionDocumentationTubeIQ() {
    return {
      RiskMisljenje: ['Risk mišljenje - SIGNED.docx'],
      OsnovniUslovi: ['OsnovniUsloviNovo.docx'],
      PredlogOdluke: ['PredlogOdlukeNovo.docx'],
      KreditniPredlog: ['KreditniProcesKreditiPredlog.docx'],
      Dokumentacija: [
        '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
        '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
        '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
        '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
        '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
        '7. OP obrazac.pdf',
        '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
        '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
        '10. Bilans stanja.pdf',
        '11. Bilans uspeha.pdf',
        '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
        '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
        '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
        '21. Analitičke kartice kupaca i dobavljača.pdf',
        '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
      ],
    };
  }

  completedDecisionCreationDocumentationTubeIQ() {
    return {
      RiskMisljenje: ['Risk mišljenje.docx'],
      OdlukaSaSedniceIO: ['OdlukaIO.docx'],
      OsnovniUslovi: ['OsnovniUsloviNovo.docx'],
      PredlogOdluke: ['PredlogOdlukeNovo.docx'],
      KreditniPredlog: ['KreditniProcesKreditiPredlog.docx'],
      Dokumentacija: [
        '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
        '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
        '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
        '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
        '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
        '7. OP obrazac.pdf',
        '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
        '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
        '10. Bilans stanja.pdf',
        '11. Bilans uspeha.pdf',
        '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
        '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
        '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
        '21. Analitičke kartice kupaca i dobavljača.pdf',
        '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
      ],
    };
  }

  completedContractCreationDocumentationTubeIQ() {
    return {
      RiskMisljenje: ['Risk mišljenje.docx'],
      OdlukaSaSedniceIO: ['OdlukaIO.docx'],
      OdlukaNakonSednicaNadleznogTela: ['Odluka nakon sednica nadležnog tela.docx'],
      OsnovniUslovi: ['OsnovniUsloviNovo.docx'],
      PredlogOdluke: ['PredlogOdlukeNovo.docx'],
      KreditniPredlog: ['KreditniProcesKreditiPredlog.docx'],
      Dokumentacija: [
        '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
        '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
        '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
        '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
        '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
        '7. OP obrazac.pdf',
        '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
        '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
        '10. Bilans stanja.pdf',
        '11. Bilans uspeha.pdf',
        '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
        '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
        '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
        '21. Analitičke kartice kupaca i dobavljača.pdf',
        '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
      ],
    };
  }

  completedContractRealizationPreparationDocumentationTubeIQ() {
    return {
      RiskMisljenje: ['Risk mišljenje.docx'],
      ObavestenjeODostavljenojDokumentaciji: ['Obaveštenje o dostavljenoj dokumentaciji.docx'],
      OdlukaSaSedniceIO: ['OdlukaIO.docx'],
      OdlukaNakonSednicaNadleznogTela: ['Odluka nakon sednica nadležnog tela.docx'],
      OsnovniUslovi: ['OsnovniUsloviNovo.docx'],
      PredlogOdluke: ['PredlogOdlukeNovo.docx'],
      KreditniPredlog: ['KreditniProcesKreditiPredlog.docx'],
      Dokumentacija: [
        '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
        '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
        '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
        '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
        '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
        '7. OP obrazac.pdf',
        '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
        '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
        '10. Bilans stanja.pdf',
        '11. Bilans uspeha.pdf',
        '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
        '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
        '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
        '21. Analitičke kartice kupaca i dobavljača.pdf',
        '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
      ],
    };
  }

  completeContractSigningDocumentationTubeIQ() {
    return {
      DokumentSaglasnosti: ['Dokument saglasnosti.docx'],
      RiskMisljenje: ['Risk mišljenje.docx'],
      ObavestenjeODostavljenojDokumentaciji: ['Obaveštenje o dostavljenoj dokumentaciji.docx'],
      OdlukaSaSedniceIO: ['OdlukaIO.docx'],
      OdlukaNakonSednicaNadleznogTela: ['Odluka nakon sednica nadležnog tela.docx'],
      OsnovniUslovi: ['OsnovniUsloviNovo.docx'],
      PredlogOdluke: ['PredlogOdlukeNovo.docx'],
      KreditniPredlog: ['KreditniProcesKreditiPredlog.docx'],
      Dokumentacija: [
        '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
        '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
        '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
        '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
        '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
        '7. OP obrazac.pdf',
        '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
        '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
        '10. Bilans stanja.pdf',
        '11. Bilans uspeha.pdf',
        '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
        '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
        '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
        '21. Analitičke kartice kupaca i dobavljača.pdf',
        '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
      ],
    };
  }

  completeContractSigningDocumentationWithRealisationTubeIQ() {
    return {
      PotpisanUgovor: ['UgovorOKreditu.docx'],
      DokumentSaglasnosti: ['Dokument saglasnosti.docx'],
      RiskMisljenje: ['Risk mišljenje.docx'],
      ObavestenjeODostavljenojDokumentaciji: ['Obaveštenje o dostavljenoj dokumentaciji.docx'],
      OdlukaSaSedniceIO: ['OdlukaIO.docx'],
      OdlukaNakonSednicaNadleznogTela: ['Odluka nakon sednica nadležnog tela.docx'],
      OsnovniUslovi: ['OsnovniUsloviNovo.docx'],
      PredlogOdluke: ['PredlogOdlukeNovo.docx'],
      KreditniPredlog: ['KreditniProcesKreditiPredlog.docx'],
      Dokumentacija: [
        '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
        '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
        '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
        '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
        '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
        '7. OP obrazac.pdf',
        '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
        '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
        '10. Bilans stanja.pdf',
        '11. Bilans uspeha.pdf',
        '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
        '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
        '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
        '21. Analitičke kartice kupaca i dobavljača.pdf',
        '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
      ],
    };
  }

  managerNameAOFI() {
    return 'Automated Test - Testing Joe';
  }

  businessActivityNameAOFI() {
    return 'Test Automation Business Activity';
  }

  exportCountryNameAOFI() {
    return 'Greece';
  }

  exportProductNameAOFI() {
    return 'Mushrooms';
  }

  emptyPlaceholdersAOFI() {
    return [
      'Нема доступних података за приказ.',
      'Nema dostupnih podataka za prikaz.',
      'No data available to display.',
      'Oстали',
    ];
  }

  foreignBuyerNameAOFI() {
    return 'Automated Test Foreign buyer';
  }

  foreignExchangeBankAOFI() {
    return 'Automated Test Foreign Exchange Bank 1';
  }

  realEstatePropertyNameAOFI() {
    return 'Automated Test - Company Property';
  }

  referenceListAttachmentNameAOFI() {
    return 'Automated Test Reference List';
  }

  referenceListUploadDocumentNameAOFI() {
    return 'Referentna lista podnosioca zahteva.docx';
  }

  productNameAOFI() {
    return 'Automated Test - Champignons';
  }

  stakeholderNameAOFI() {
    return 'Automated Test - Legal Entity';
  }

  domesticSupplierNameAOFI() {
    return 'Automated Test Domestic Supplier 1';
  }

  clientQuestionaireFileNameTubeIQ() {
    return 'Upitnik za izradu kreditnog dosijea za klijenta.docx';
  }

  guarantorQuestionaireFileNameTubeIQ() {
    return 'Upitnik za izradu kreditnog dosijea za jemca.docx';
  }

  signedCreditProposalFileNameTubeIQ() {
    return 'KreditniProcesKreditiPredlog.docx';
  }

  signedDecisionIOFileNameTubeIQ() {
    return 'OdlukaIO.docx';
  }

  signedDecisionCreationFileNameTubeIQ() {
    return 'Odluka nakon sednica nadležnog tela.docx';
  }

  noticeOnSubmittedDocumentationTubeIQ() {
    return 'Obaveštenje o dostavljenoj dokumentaciji.docx';
  }

  documentConsentTubeIQ() {
    return 'Dokument saglasnosti.docx';
  }

  signedCreditProposalDecisionFileNameTubeIQ() {
    return 'PredlogOdlukeNovo.docx';
  }

  signedBasicConditionsDecisionProposalFileNameTubeIQ() {
    return 'OsnovniUsloviNovo.docx';
  }

  signedRiskOpinionFileNameTubeIQ() {
    return 'Risk mišljenje.docx';
  }

  signedCreditContractFileNameTubeIQ() {
    return 'UgovorOKreditu.docx';
  }

  signedFinalRiskOpinionFileNameTubeIQ() {
    return 'Risk mišljenje - SIGNED.docx';
  }

  collateralExportDataTableTubeIQ() {
    return {
      Godina: '2025',
      Iznos: '367880',
      Valuta: 'EUR',
      Komentar: 'Buyer - Hellenic Import T.E.S.T.',
    };
  }

  collateralExportDataAssertTubeIQ() {
    return {
      Godina: '2025',
      Iznos: '367.880,00',
      Valuta: 'EUR',
      Komentar: 'Buyer - Hellenic Import T.E.S.T.',
    };
  }

  riskOpinionFormTestData() {
    return {
      delatnost: 'Test Automation Business Activity',
      namena:
        'Automation test AOFI credit request legal entity (Financing of working capital to increase the capacity of production and export of mushrooms to the EU market)',
      ukupnaIzlozenost: [
        '- Total exposure to foreign customers: EUR 250,000',
        '- Currently active: 125,000 EUR',
        '- Remaining limit: 125,000 EUR',
      ].join('\n'),
      stanjeDuga:
        'The total balance of the debt amounts to EUR 420,002 in RSD equivalent at the middle exchange rate of the NBS.',
      dospeleObaveze:
        'All due obligations have been settled in accordance with the confirmation of the Tax Administration (not older than 30 days).',
      napomene: [
        '- There are no recorded delays in the repayment of obligations',
        '- Credit history in order',
      ].join('\n'),
      posebniUslovi: [
        '- Approved grace period of 6 months',
        '- Possibility of early repayment without penalty',
      ].join('\n'),
      evaluacijaPredlogaAplikant: [
        '- The applicant proposal was evaluated as justified',
        '- Stable financial indicators',
        '- Continuous growth of export activities ',
      ].join('\n'),
      glavniPozitivniAspektiAplikant: [
        '- Product quality',
        '- Organic certificates',
        '- Long-term cooperation with customers',
      ].join('\n'),
      glavniNegativniAspektiAplikant: [
        '- Limited capacity of the refrigerator',
        '- Lack of a brand on the EU market',
      ].join('\n'),
      interniRejtingAplikant: 'B+ (stable, with growth potential), Category: low-risk client',
      ostaleNapomene: 'It is necessary to provide additional capital for the planned export growth',
      klasifikacija: 'Long-term loan, low-risk client with growing export potential',
      misljenjeDirekcijeZaRizike: [
        '- This client is considered low risk',
        '- Significant Growth Potential',
        '- Recommendation: Approve Loan',
      ].join('\n'),
    };
  }

  riskOpinionFinalDocumentTestData() {
    return [
      'MIŠLJENJE DIREKCIJE ZA UPRAVLJANJE RIZICIMA',
      'KLIJENT/USTUPILAC: QATesting, adresaPrva, MB 16859722,',
      '1. Delatnost:',
      'Test Automation Business Activity',
      '2. Zahtev:',
      'Кratkoročni kredit sa planom otplate',
      '3. Namena kredita/plasmana:',
      'Automation test AOFI credit request legal entity (Financing of working capital to increase the capacity of production and export of mushrooms to the EU market)',
      '4. Instrumenti obezbeđenja:',
      '- Company promissory note (Menica preduzeća)',
      '- Guarantee (Garancija)',
      '- Deposit (Depozit)',
      '- Bank guarantee (Garancija banke)',
    ];
  }

  basicConditionsDocumentData() {
    return [
      'Naziv klijenta: QATesting',
      'Vrsta plasmana: Кratkoročni kredit sa planom otplate',
      'Ispunjenost uslova po odluci o uslovima kreditiranja i visini kamatnih stopa i provizija',
      '1.	Posedovanje ugovora o zaključenom spoljnotrgovinskom poslu sa ino kupcem ili odgovarajuće dokumentacije iz koje se može nedvosmisleno zaključiti da se radi o izvoznom poslu i/ili poslovima kojima se utiče na podsticaj izvoza u vrednosti od najmanje EUR 100.000,00.	Da',
      '2.	Ostvaren izvoz u vrednosti od najmanje EUR 100.000,00 u prethodnoj godini ili proporcionalna vrednost izvoza u tekućoj godini, do trenutka podnošenja zahteva.	Da',
      '3.	Ostvaren pozitivan neto rezultat poslovanja u prethodnoj godini izuzev ukoliko se radi o rešavanju problematičnih plasmana u Agenciji.	Da',
      '4.	Dostavljena potvrda iz Poreske uprave da su izmirene sve dospele obaveze ne starija od 30 dana od dana podnošenja zahteva.	Da',
      'Izloženost Agencije prema jednom pravnom licu ili grupi povezanih pravnih lica manja je od 5% ukupnog kapitala	Da',
      '______________________',
      'Kreditni referent',
      'Datum: _______¬_ godine.',
    ];
  }

  decisionIODocumentData() {
    return [
      'На основу процене бонитета и опште кредитне способности упућујемо Извршном одбору Агенције за осигурање и финансирање извоза:',
      'ПРЕДЛОГ ОДЛУКЕ',
      'По захтеву QATesting, adresaPrva, 16859722, одобрава се Кratkoročni kredit sa planom otplate под следећим условима:',
      '1. Износ',
      '420.002',
      'Валута',
      'ЕУР у РСД противвредности по средњем курсу НБС',
      '2. Рок доспећа',
      '60 months (5 years)',
      '3. Начин отплате',
      '- Monthly installments according to the annuity plan',
      '- Automatic payment through the bank',
      '- Possibility of early repayment without penalty',
      '4. Накнада за обраду захтева',
      '2% administrative fee',
      '5. Каматна стопа',
      '10%, fixed installment %',
      '6. Инструменти обезбеђења',
      '- Company promissory note (Menica preduzeća)',
      '- Guarantee (Garancija)',
      '- Deposit (Depozit)',
      '- Bank guarantee (Garancija banke)',
      '7. Посебни услови:',
      'Approved grace period of 6 months',
      '8. Рејтинг',
      'Internal rating: B+ (stable, with growth potential) - Category: low-risk client with growing export potential',
      '9. Укупна изложеност према агенцији',
      '- Total exposure to foreign customers: EUR 250,000',
      '- Currently active: 125,000 EUR',
      '- Remaining limit: 125,000 EUR',
      'ZADUŽENI REFERENT',
      'DIREKTOR SEKTORA ZA KREDITE',

      '____________________',
      '____________________________',
      'Petar Pavlović',
    ];
  }

  creditProposalDocumentData() {
    return [
      'КРЕДИТНИ ПРЕДЛОГ',
      'QATesting, adresaPrva, матични број 16859722',
      'I ОБРАЗЛОЖЕЊЕ ЗАХТЕВА',
      'Намена',
      'Automation test AOFI credit request legal entity (Financing of working capital to increase the capacity of production and export of mushrooms to the EU market)',
      'Инструменти обезбеђења',
      '- Company promissory note (Menica preduzeća)',
      '- Guarantee (Garancija)',
      '- Deposit (Depozit)',
      '- Bank guarantee (Garancija banke)',
      'II ОСНОВНИ ПОДАЦИ О ПОДНОСИОЦУ ЗАХТЕВА',
      'Делатност',
      'Опис',
      '% учешће у укупном капиталу',
      // 'Cultivation and production of champignons and mushrooms	100,00',
      'Test Automation Business Activity',
      'УКУПНО:	100,00',
      'ПОДАЦИ О ИЗВОЗУ',
      'Година	Износ	 Коментар',
      '2025	367.880,00EUR	Buyer - Hellenic Import T.E.S.T.',
      '- Buyer: Hellenic Import T.E.S.T.',
      '- Cooperation: Since 2015 with stable dynamics of orders',
      '- Planned increase in exports',
      'Извозна активност зајмотражиоца',
      'Регионални распоред извршеног извоза:',
      'Земља извоза	Предузеће	Врста производа / Услуге	Претходна година	Текућа година	Наредна година (пројекција)	Вредност потписаних а нереализованих извозних Уговора',
      'Greece	Hellenic Import T.E.S.T.	Direct sales	123.055,00	94.577,00	0,00	0,00',
      'Оснивање и статусне промене',
      'Опис статусне промене	Година	Коментар',
      'Оснивање фирме	2001',
      'Власничка структура предузећа',
      'Име и презиме физичког лица 	Адреса	Учешће у власништву у %',
      'Менаџерска структура',
      'Име и презиме	Позиција	Године проведене у фирми	Старост	% Учешће у капиталу	Радно искуство',
      'Број запослених и квалификациона структура',
      'ВСС',
      'ВШС',
      'ССС',
      'Укупно',
      'Преглед пословних просторија/непокретности које су у власништву предузећа и које предузеће користи у закупу',
      'Земљиште:',
      'Некретнине:',
      'Основна опрема:',
      'Повезана правна лица',
      'Судски спорови',
      'III СЕКТОРСКА АНАЛИЗА И СТРАТЕГИЈА',
      'Кратка секторска анализа  (структура/ конкуренција/ тржишна позиција фирме/ ризици и очекивања)',
      'Production, marketing, and sale of mushrooms:',
      '- The mushroom market in the EU records a stable growth of ~5% per year',
      '- Demand is highest in the HoReCa sector (hotels, restaurants, catering)',
      '- Competition in the region is moderate, with several larger producers in Poland and Hungary',
      '- The advantage of domestic manufacturers is flexibility and fast delivery',
      'СВОТ анализа',
      'Снаге 1. Product quality,  2.Organic production certificates,  3. Long-term cooperation with customers',
      'Слабости 1. Limited cold storage capacity,  2. Lack of brand in the EU market',
      'Могућности 1. Expansion to new markets (Germany,Austria),  2. Introduction of new products (Dried mushrooms, Homeopathic products, Production of supplements)',
      'Претње 1. Changes in EU regulations,  2. Increase in transport costs',
      'Реферетнтна листа подносиоца захтева',
      'This is the Test Reference list:',
      '1# Test Reference 1',
      '2# Test Reference 2',
      '3# Test Reference 3',
      'IV ФИНАНСИЈСКА ПОЗИЦИЈА ПОДНОСИОЦА ЗАХТЕВА',
      'Платни промет преко банака',
      'Динарски у 000 РСД',
      'Назив банке	Промет у текућој години	Промет у претходној години УКУПНО:',
      'Девизни у 000 ЕУР',
      'Назив банке	Промет у текућој години	Промет у претходној години УКУПНО:',
      'Ликвидност/дани блокаде Број дана блокаде у последња 3 месеца: - од чега непрекидно дана: Износ блокада рачуна у претходних годину дана: Датум последње блокаде рачуна: Број дана у последњој блокади: Блокиран од стране:',
      'Задуженост у банкама (укључујући  лизинг, факторинг, гаранције итд.) на дан бруто биланса',
      '- There are no recorded delays in the repayment of obligations',
      '- Credit history in order, without negative items',
      '- Assessed as a low-risk client',
      '- Need to provide additional capital for export growth',
      'Сарадња са АОФИ There is no previous cooperation',
      'Анализа биланса стања - Total assets: EUR 2.8 million - Structure: 60% current assets, 40% fixed assets - Capital: EUR 1.5 million - Liabilities: EUR 1.3 million (mostly short-term)',
      'Подаци о купцима (домаћи):',
      'Подаци о купцима (међународни):',
      'Рочна структура потраживања на дан достављеног закључног листа',
      'Недоспела потраживања тражиоца пласмана од купца',
      'Доспела потраживања тражиоца пласмана од купца (прошао дан валуте)',
      'Услови продаје производа и услуга:',
      'Подаци о добављачима(домаћи):',
      'Подаци о добављачима(међународни):',
      'Рочна структура обавеза на дан достављеног закључног листа',
      'Недоспеле обавезе тражиоца пласмана према добављачима у 000 РСД',
      'Доспеле обавезе тражиоца пласмана према добављачима (прошао дан валуте) у 000 РСД',
      'Анализа биланса успеха - Revenues in 2024: 1.2 million EUR (12% growth compared to 2023) - Net profit: EUR 95,000 - EBITDA margin: 14%',
      'ПРОДАЈА по главним групама производа (износи у 000 РСД)',
      'Анализа новчаних токова - Projection for 2025: revenue growth 15%, expected net profit EUR 120,000 - Cash flows are positive, but depend on seasonal exports - Planned increase in exports by 20% in the coming two years',
      'VII КЛАСИФИКАЦИЈА / РЕЈТИНГ',
      'VIII ЗАКЉУЧАК - The company is engaged in the production and export of mushrooms, with stable financial indicators and long-term cooperation with customers in the EU - The necessary funds are intended for the expansion of capacity and the strengthening of exports - The risk is low, and the growth potential is significant - Recommendation: approve credit placement',
      'Обрадио: _______________________ Датум:  године.',
    ];
  }

  signedCreditContractDocumentData() {
    return [
      'У Г О В О Р',
      'о динарском кредиту Број:',
      'који закључују у Београду, __________ године:',
      '1. Агенција за осигурање и финансирање извоза Републике Србије а.д. Ужице,',
      'Улица Љуба Стојановића број 5, ПИБ: 103982111, МБ: 20069244, број текућег рачуна',
      '840-1208664-93 (у даљем тексту: Агенција), коју заступа генерални директор, Дејан Вукотић, и',
      '2. QATesting, Улица adresaPrva, ПИБ: 776185205, МБ: 16859722 (у даљем тексту:',
      'Корисник кредита), које заступа QATest Director.',
      'ПРЕДМЕТ УГОВОРА',
      'Члан 1.',
      'На основу Одлуке Извршног одбора Агенције Број: IO-025/2026IO-025/2026 од . године,',
      'Агенција одобрава Кориснику кредита кредит у износу од',
      'EUR 420.002',
      '(словима: Četiri stotine dvadeset hiljada i dva евра),',
      'у динарској противвредности по средњем званичном курсу Народне банке Србије који',
      'важи на дан пуштања кредита у течај (у даљем тексту: кредит).',
      'УСЛОВИ ОДОБРАВАЊА КРЕДИТА',
      'Члан 2.',
      'Намена',
      'Кредит се одобрава за следећу намену: Automation test AOFI credit request legal',
      'entity (Financing of working capital to increase the capacity of production and export of',
      'mushrooms to the EU market)',
      'Рок',
      'Кредит се одобрава на период од 12 месеци, који се рачуна почев од дана пуштања',
      'кредита у течај (са роком доспећа на дан 60 months (5 years) године).',
      'Редовна камата',
      'На износ кредита, изражен у ЕУР, из члана 1. овог уговора, Агенција обрачунава',
      'и наплаћује редовну камату по стопи од 10%, fixed installment %  на годишњем нивоу, са',
      'обрачуном камате пропорционалном методом на остатак главног дуга по кредиту, почев',
      'од дана пуштања кредита у течај до дана доспелости, на основу стварно протеклих броја',
      'дана и године од 360 дана.',
      'Провизија',
      'За обраду кредитног захтева по овом уговору, Корисник кредита се обавезује да',
      'након закључења овог уговора, а пре пуштања кредита у течај, плати Агенцији',
      'једнократну провизију од 0,7% на износ кредита, обрачунату у динарској',
      'противвредности по средњем званичном курсу Народне банке Србије који важи на дан',
      'плаћања, на рачун  бр. 840-1075668-23 са позивом на број КР–/19–П.',
      'Пуштање кредита у течај',
      'Агенција ће кредит пустити у течај у једнократном износу након уплате провизије',
      'за обраду захтева из става 4. овог члана и заснивања и предаје инструмената обезбеђења',
      'и наплате потраживања по овом уговору, преносом динарске противвредности средстава',
      'по одобреном кредиту са обрачуном по средњем званичном курсу Народне банке Србије',
      'који важи на дан преноса средстава на текући рачун који одреди Корисник кредита.',
      'Као дан пуштања кредита у течај рачуна се дан када је пренос средстава из става 5.',
      'овог члана извршен.',
      'Корисник кредита је дужан да повуче средства из става 5. овог члана у року од 60',
      'дана од дана закључења овог уговора. У супротном, Агенција може једнострано',
      'раскинути овај уговор.',
      'Примена валутне клаузуле',
      'Износ кредита утврђује се у ЕУР, са обавезом Корисника кредита да исти плаћа у',
      'динарској противвредности, по средњем званичном курсу Народне банке Србије који',
      'важи на дан плаћања.',
      'Редовна камата утврђује се у ЕУР, са обавезом Корисника кредита да исту плаћа у',
      'динарској противвредности, по средњем званичном курсу Народне банке Србије који',
      'важи на дан плаћања.',
      'Поред потраживања из става 9. овог члана и друга потраживања Агенције по овом',
      'уговору могу се утврђивати у ЕУР на дан настанка обавезе или на дан обрачуна, са',
      'обавезом Корисника кредита да исте плаћа у динарској противвредности по средњем',
      'званичном курсу Народне банке Србије који важи на дан уплате те обавезе.',
      'Код плаћања обавеза у периоду доцње по овом уговору на које се примењује валутна',
      'клаузула, Корисник кредита је дужан да динарску противвредност доспелог износа',
      'обрачуна применом средњег курса Народне банке Србије који  важи на дан плаћања',
      'Отплата',
      'Отплата главног дуга врши се __________________________________',
      '1. у __ једнаке-их рате-а од по___ ЕУР тако да прва рата доспева _______ године, друга',
      '______ године и трећа на дан истека рока кредита.',
      '2. у ратама и то: прва рата од ЕУР_______на дан_________. године, друга рата од ЕУР',
      '________ на дан _________. године и трећа рата од ЕУР ________ на дан_____ (или: на',
      'дан истека рока кредита).',
      '3. једнократно, на дан истека рока кредита.',
      'Редовна камата се обрачунава и плаћа месечно сваког последњег датума у месецу',
      'за тај месец и на дан доспећа кредита.',
      'Корисник кредита је дужан да главни дуг плаћа на рачун број 840-1208664-93 са',
      'позивом на број КР–/19, а камату на рачун бр. 840-1075668-23 са позивом на број КР–',
      '/19–К.',
      'Плаћање камате Корисник кредита врши у складу са обрачуном који Агенција',
      'доставља Кориснику кредита писаним путем.',
      'Редослед наплате',
      'Из наплаћених средстава Агенција измирује обавезе Корисника кредита по',
      'редоследу приоритета, и то: трошкови, накнаде, затезна камата, редовна камата и',
      'главница.',
      'Трошкови',
      'Корисник кредита се обавезује да надокнади Агенцији све трошкове који настану',
      'у вези са закључењем и реализацијом овог уговора, реализацијом инструмената',
      'обезбеђења, вођењем судских и других поступака, трошкове платног промета и друге',
      'трошкове.',
      'Као дан доспећа за накнаду обавеза из става 17. овог члана рачуна се дан упућивања',
      'Кориснику кредита писаног обавештења о постојању и висини обавезе, или у складу са',
      'рачунањем доспелости по судској одлуци или одлуци другог органа из које таква обавеза',
      'произлази.',
      'Затезна камата',
      'Агенција ће у периоду доцње Корисника кредита на сва доспела а ненаплаћена',
      'потраживања по овом уговору обрачунавати законску затезну камату у складу са',
      'Законом о затезној камати. Затезна камата обрачунава се на остатак главног дуга са',
      'применом од дана наступања доцње.',
      'Затезна камата се обрачунава на износ динарског потраживања или на динарску',
      'противвредност потраживања израженог у ЕУР обрачунату по средњем званичном курсу',
      'Народне банке Србије који важи на дан плаћања.',
      'Документација',
      'Корисник кредита је дужан да по захтеву Агенције достави сву документацију и',
      'обавештења неопходна за спровођење овог уговора.',
      'Поред наведеног у ставу 21. овог члана, Корисник кредита је обавезан да у',
      'периоду важења овог уговора доставља Агенцији документацију и обавештења у складу',
      'са чланом 8. овог уговора.',
      'Oбавештавање и достављање',
      'Сва обавештења и документацију која се односи на спровођење овог уговора',
      'уговорне стране ће међусобно достављати непосредно и у писаној форми – путем',
      'телефакса, препорученом поштом на адресе седишта која су означена у овом уговору,',
      'односно на адресе о којима уговорне стране накнадно обавесте једна другу писаним',
      'путем, или на други одговарајући начин који обезбеђује несумњив доказ о пријему.',
      'Писана обавештења и документација које уговорне стране шаљу препорученом',
      'поштом сматрају се урученим другој уговорној страни истеком рока од пет дана од',
      'датума када је пошиљалац предао препоручену пошиљку пошти.',
      'ПРЕВРЕМЕНА ОТПЛАТА',
      'Члан 3.',
      'Корисник кредита може превремено отплатити кредит у целости или делимично,',
      'у складу са обрачуном Агенције.',
      'ИНСТРУМЕНТИ ОБЕЗБЕЂЕЊА И НАПЛАТЕ',
      'Члан 4.',
      'На име обезбеђења и наплате доспелих потраживања Агенције по овом уговору,',
      'Корисник кредита се обавезује да заснује и преда Агенцији после закључења овог',
      'уговора, а пре пуштања кредита у течај, следеће инструменте обезбеђења и наплате',
      'потраживања:',
      '1) десет регистрованих бланко потписаних и оверених сопствених меница',
      'Корисника кредита плативих на одређени дан, са клаузулом „без протеста”, уз копију',
      'спесимена потписа и овлашћење за њихово попуњавање и подношење на наплату у',
      'тексту у складу са захтевом Агенције;',
      '2) гаранцију _______ банке а.д., Београд (пословне банке Корисника кредита по',
      'опредељењу Агенције), на износ од ЕУР ___________ у динарској противвредности по',
      'средњем званичном курсу НБС који важи на дан плаћања по гаранцији, која мора бити',
      'безусловна, платива на први позив без приговора, са роком важења до _______(15 дана',
      'дужим од рока доспећа кредита).',
      '3. __ (___) сопствених меница Корисника кредита са авалом _______ банке а.д.',
      'Београд (пословне банке Корисника кредита по опредељењу Агенције), на износ од по',
      'ЕУР _______ у динарској противвредности по средњем курсу НБС који важи на дан',
      'плаћања, плативе по виђењу са клаузулом „без протеста“, са уписом датума издавања',
      'меница на дан закључења овог уговора и местом плаћања код ________ банке а.д.,',
      'Београд, ул._______.',
      '4.  (___) бланко сопствених меница Корисника кредита са авалом _______банке',
      'а.д_______, плативе по виђењу са клаузулом „без протеста“, са уписом датума издавања',
      'меница на дан закључења овог уговора и местом плаћања код ______ а.д.__________ –',
      'Пословне јединице Београд,  ул. ____________и овлашћењем за њихово попуњавање и',
      'подношење на наплату у тексту у складу са захтевом Агенције,',
      '5) уговорно јемство ____(назив и седиште јемца)____, са 2 регистроване бланко',
      'сопствене менице јемца плативе по виђењу (на одређени дан) са клаузулом „без',
      ' протеста“, уз копију спесимена потписа и овлашћење за њихово попуњавање и',
      ' подношење на наплату у тексту у складу са захтевом Агенције,',
      '6) хипотеку/ручну залогу првог реда која ће се успоставити на основу овог',
      ' Уговора и____________________________, на непокретности/покретној ствари у',
      ' власништву Корисника кредита (или другог лица)___________ у _________, ул.',
      ' ________, коју чини _________________, постојећој на к.п. _______ , КО ________, зкул',
      ' ______,',
      '7.___(други инструменти  по одлуци Извршног одбора Агенције)___',
      'Корисник кредита се обавезује да за период коришћења и отплате кредита осигура',
      ' непокретности / покретне ствари из става 1. тачка ___ овог члана код  првокласног',
      ' осигуравајућег друштва од свих уобичајених ризика на тржишну вредност ствари и да',
      ' полису осигурања винкулира на Агенцију.',
      'У случају да је осигурање закључено на краћи период од периода важења овог',
      ' уговора, Корисник кредита је обавезан да благовремено, пре истека текућег периода',
      ' осигурања, изврши обавезу из претходног става и да о томе обавести Агенцију уз',
      ' достављање доказа о извршеној винкулацији полисе у корист Агенције.',
      'Корисник кредита тврди под пуном одговорношћу да су наведене непокретности',
      '/ покретне ствари без терета и да на њима не постоје било каква права других лица, нити',
      'се у вези са њима води спор или било који други поступак.',
      'Члан 5.',
      'Корисник кредита се обавезује да у року који определи Агенција обезбеди',
      'заснивање и предају нових инструмената обезбеђења и наплате потраживања по овом',
      'уговору у складу са захтевом Агенције, ако у периоду важења овог уговора:',
      '1) дође до измене прописа којима се уређује режим инструмената обезбеђења и',
      'наплате пoтраживања, а који условљавају промену инструмената обезбеђења и',
      'наплате потраживања по овом уговору;',
      '2) Агенција активира неки од инструмената обезбеђења и наплате потраживања;',
      '3) према оцени Агенције буде неопходно достављање додатних инструмената по',
      'овом уговору.',
      'Корисник кредита се обавезује да сноси све трошкове у вези са предајом,',
      'заснивањем и реализацијом инструмената обезбеђења и наплате потраживања по овом',
      'уговору.',
      'Члан 6.',
      'Агенција се обавезује да након наплате свих потраживања по овом уговору,',
      'Кориснику кредита  врати, односно изврши брисање предатих, односно заснованих',
      'инструмената обезбеђења и наплате потраживања.',
      'ОСТАЛА ПРАВА И ОБАВЕЗЕ УГОВОРНИХ СТРАНА',
      'Члан 7.',
      'Агенција задржава право да пуштање кредита у течај по овом уговору врши у',
      'складу са могућностима свог кредитног потенцијала.',
      'Члан 8.',
      'Корисник кредита се обавезује да у периоду важења овог уговора благовремено',
      'обавештава Агенцију, уз достављање одговарајуће документације о:',
      '1. свим променама везаним за своје пословање (намери за спровођење статусних',
      'и власничких промена и о спровођењу истих, промени седишта, лица овлашћених за',
      'заступање, назива и сл.);',
      '2. намери куповине, продаје, оптерећења и/или располагања на било који други',
      'начин имовином, осим ситним инвентаром, које не представља редовну и наменску',
      'употребу ствари и права;',
      '3. другим чињеницама и околностима које су од утицаја, или могу бити од утицаја',
      'на извршавање овог уговора и уредну отплату  кредита.',
      'Уколико Агенција процени да би неко од поступања Корисника кредита из става',
      'овог члана негативно утицало на извршавање овог уговора и на уредну отплату кредита,',
      'Агенција има право да захтева од Корисника кредита да то поступање не спроведе до',
      'потпуне наплате свих потраживања Агенције према Кориснику кредита по овом уговору,',
      'а Корисник кредита је дужан да поступа у складу са тим захтевом Агенције.',
      'МОНИТОРИНГ',
      'Члан 9.',
      'Корисник кредита је дужан да кредит користи у складу са наменом из члана 2.',
      'овог уговора по ком основу Агенција има право да у периоду до потпуне отплате свих',
      'обавеза Корисника кредита по овом уговору, врши контролу његовог наменског',
      'коришћења (мониторинг).',
      'Мониторинг из става 1. овог члана обухвата све мере и активности које су по',
      'оцени Агенције неопходне за праћење извршавања обавеза Корисника кредита по овом',
      'уговору и поштовање одредаба овог уговора од стране Корисника кредита.',
      'Корисник кредита је дужан да на захтев Агенције стави на увид или достави',
      'потребну документацију, информације и податке неопходне за спровођење мониторинга',
      'из става 1. овог члана.',
      'ВЕРОДОСТОЈНОСТ ДОКУМЕНАТА, ПОДАТАКА',
      'И ИЗЈАВА КОРИСНИКА КРЕДИТА',
      'Члан 10.',
      'Закључењем овог уговора Корисник кредита изјављује и потврђује под пуном',
      'одговорношћу да су веродостојни и тачни сви подаци, изјаве и документација',
      'достављена Агенцији у вези са овим уговором и да ништа није прикрио што би било од',
      'утицаја на доношење одлуке Агенције о одобравању кредита и с тим у вези изјављује да:',
      '1) је основан и да послује у складу са важећим законом;',
      '2) је одлуку о задужењу по предметном кредитном захтеву донео надлежни орган,',
      'као и да су сва предата документа веродостојна, важећа и потписана од стране',
      'овлашћених лица;',
      '3) је прибавио све сагласности и одобрења неопходна за закључење и реализацију',
      'овог уговора;',
      '4) нема доспелих неизмирених обавеза у земљи и иностранству, осим исказаних',
      'у својој билансној и књиговодственој документацији поднетој по предметном кредитном',
      'захтеву;',
      '5) се против њега не води судски или било који други поступак, као и да не постоје',
      'одлуке судова или других органа у земљи или у иностранству донетих на његов терет,',
      'по основу којих би могло да дође до пленидбе средстава и имовине Корисника кредита,',
      'или примене било које мере која би могла негативно да утиче на његово пословање;',
      '6) редовно измирује своје пореске и друге обавезе према државним органима,',
      'организацијама и фондовима;',
      '7) је сагласан да Агенција прибавља извештаје од „Кредитног бироа” Удружења',
      'банака и других финансијских организација (основне, синтетичке и додатне извештаје)',
      'о начину коришћења банкарских услуга, као и о поступању Корисника кредита по',
      'обавезама које има према другим повериоцима.',
      'Члан 11.',
      'У случају да Агенција у току важења овог уговора утврди да су достављени',
      'подаци, изјаве и документација у вези са овим уговором нетачни, непотпуни и',
      'неверодостојни, Агенција може једнострано раскинути овај уговор и/или прогласити',
      'кредит доспелим, а Корисник кредита се обавезује да Агенцији надокнади, поред',
      'потраживања која непосредно проистичу из овог уговора и сву штету коју Агенција трпи',
      'по овом основу.',
      'ДОСПЕЋЕ И РАСКИД УГОВОРА ПРЕ ИСТЕКА РОКА',
      'Члан 12.',
      'Агенција може једнострано раскинути овај уговор и прогласити сва потраживања',
      'по овом уговору доспелим, у случају:',
      'неизмиривања било ког износа доспеле обавезе по овом уговору;',
      'да Корисник кредита не изврши обавезу из члана 4. став 3. овог уговора и/или,',
      'не достави Агенцији инструменте обезбеђења и наплате потраживања у складу',
      'са чланом 5. овог уговора;',
      'ненаменског коришћења кредита и/или уколико Корисник кредита не омогући',
      'Агенцији наменску контролу предвиђену чланом 9. овог уговора;',
      'необавештавања и/или неблаговременог обавештавања Агенције о',
      'намераваним и спроведеним променама, као и о чињеницама и околностима из',
      'члана 8. став 1. овог уговора, као и у случају непоступања по захтеву Агенције',
      'из члана 8. став 2. овог уговора;',
      'покретања поступка стечаја против Корисника кредита, парничног поступка,',
      'или поступка принудног извршења на средствима и имовини Корисника',
      'кредита, или других поступака са могућим сличним последицама, или у случају',
      'да је покретање ових поступака у изгледу, који према оцени Агенције могу',
      'негативно утицати на измиривање обавеза Корисника кредита по овом уговору;',
      'промена у пословању Корисника кредита или погоршања материјалне позиције',
      'Корисника кредита, што би по оцени Агенције утицало, или могло утицати на',
      'његову способност да измирује обавезе по овом уговору.',
      'Раскид овог уговора и доспеће потраживања у складу са ставом 1. овог члана',
      'ступају на снагу даном упућивања  Кориснику кредита писаног обавештења о томе.',
      'ЗАВРШНЕ ОДРЕДБЕ',
      'Члан 13.',
      'Уговорне стране су сагласне да све евентуалне спорне односе проистекле из овог',
      'уговора реше споразумно, а у случају покретања судског спора уговорне стране одређују',
      'надлежност Привредног суда у Београду.',
      'Члан 14.',
      'Промене уговорених права и обавеза уговорне стране могу вршити искључиво у',
      'писаној форми, закључивањем анекса овог уговора.',
      'Члан 15.',
      'Овај уговор ступа на снагу на дан када га потпишу овлашћени представници',
      'уговорних страна.',
      'Члан 16.',
      'Овај уговор је сачињен у четири истоветна примерка, од којих по два задржава',
      'свака уговорна страна.',
      ' ЗА КОРИСНИКА КРЕДИТА',
      'ЗА АГЕНЦИЈУ',
      'ГЕНЕРАЛНИ ДИРЕКТОР',
      'Дејан Вукотић',
    ];
  }

  creditCreditDecisionProposalDocumentData() {
    return [
      'На основу процене бонитета и опште кредитне способности упућујемо Извршном одбору Агенције за осигурање и финансирање извоза:',
      'ПРЕДЛОГ ОДЛУКЕ',
      'По захтеву QATesting, adresaPrva, MB 16859722, одобрава се Кratkoročni kredit sa planom otplate за финансирање извозног посла под следећим условима:',
      '1. Износ',
      '420.002',
      'Валута',
      'ЕУР у РСД противвредности по средњем курсу НБС',
      '3. Начин отплате',
      '- Monthly installments according to the annuity plan',
      '- Automatic payment through the bank',
      '- Possibility of early repayment without penalty',
      '4. Накнада за обраду захтева',
      'Jednokratno unapred 2% administrative fee %',
      '5. Каматна стопа',
      '10%, fixed installment % godišnje',
      '6. Инструменти обезбеђења',
      '- Company promissory note (Menica preduzeća)',
      '- Guarantee (Garancija)',
      '- Deposit (Depozit)',
      '- Bank guarantee (Garancija banke)',
      '7. Посебни услови:',
      'Approved grace period of 6 months',
      '8. Рејтинг',
      'Internal rating: B+ (stable, with growth potential) - Category: low-risk client with growing export potential',
      '9. Укупна изложеност према агенцији',
      '- Total exposure to foreign customers: EUR 250,000',
      '- Currently active: 125,000 EUR',
      '- Remaining limit: 125,000 EUR',
      'ZADUŽENI REFERENT',
      '____________________',
      'DIREKTOR SEKTORA ZA KREDITE',
      '____________________________',
      'Petar Pavlović',
    ];
  }

  creditRequestDocumentsAOFI() {
    return [
      {
        index: 0,
        fileName: '1. Zahtev za odobravanje plasmana na memorandumu firme.pdf',
        note: 'Zahtev za odobravanje plasmana',
      },
      {
        index: 1,
        fileName: '2. Popunjen Upitnik za izradu kreditnog dosijea.pdf',
        note: 'Upitnik za izradu kreditnog dosijea',
      },
      {
        index: 2,
        fileName:
          '3. Kopija Ugovora o izvoznom poslu koji je predmet finansiranja (nije obavezno za jemca) - Copy.pdf',
        note: 'Kopija Ugovora o izvoznom poslu',
      },
      {
        index: 3,
        fileName:
          '4. Osnivački akt (Ugovor o osnivanju ukoliko je klijent osnovan od strane više osnivača ili odluka o osnivanju, ukoliko je klijent osnovan od strane jednog osnivača).pdf',
        note: 'Osnivački akt',
      },
      {
        index: 5,
        fileName:
          '6. Izvod iz registra privrednih subjekata koji vodi Agencija za privredne registre.pdf',
        note: 'Izvod iz registra privrednih subjekata',
      },
      { index: 6, fileName: '7. OP obrazac.pdf', note: 'OP Obrazac' },
      {
        index: 7,
        fileName:
          '8. Karton deponovanih potpisa sa napomenom – kopija verna originalu, overena od strane banke u tekućoj godini.pdf',
        note: 'Karton deponovanih potpisa',
      },
      {
        index: 8,
        fileName:
          '9. Identifikacioni dokument (lična karta i  ili pasoš – očitane i  ili kopije ovlašćenog lica klijenta.pdf',
        note: 'Identifikacioni dokument ovlašćenog lica klijenta',
      },
      { index: 9, fileName: '10. Bilans stanja.pdf', note: 'Bilans stanja' },
      { index: 10, fileName: '11. Bilans uspeha.pdf', note: 'Bilans uspeha' },
      {
        index: 16,
        fileName: '17. Zaključni list 31.12. sa potpisom i pečatom klijenta.pdf',
        note: 'Zaključni list 31.12.',
      },
      {
        index: 17,
        fileName: '18. Zaključni list iz tekuće godine što novijeg datuma.pdf',
        note: 'Zaključni list iz tekuće godine',
      },
      {
        index: 19,
        fileName:
          '20. Potvrda nadležne poreske uprave o izmerenim poreskim obavezama koja nije starija od 30 dana od dana podnošenja zahteva (nije obavezno za jemca).pdf',
        note: 'Potvrda nadležne poreske uprave o izmerenim poreskim obavezama',
      },
      {
        index: 20,
        fileName: '21. Analitičke kartice kupaca i dobavljača.pdf',
        note: 'Analitičke kartice',
      },
      {
        index: 21,
        fileName: '22. Popunjena saglasnost klijenta – Kreditni biro za povlačenje izveštaja.pdf',
        note: 'Saglasnost klijenta',
      },
    ];
  }
}
export const getTestData = new TestData();
