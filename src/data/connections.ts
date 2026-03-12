export type Segment =
  | 'Hotel GM'
  | 'Hospitality C-Suite'
  | 'Consultant/Advisor'
  | 'Revenue/Sales'
  | 'Marketing'
  | 'F&B'
  | 'Tech/IT'
  | 'Finance'
  | 'Real Estate'
  | 'Other'

export type Seniority = 'C-Suite' | 'VP/Director' | 'Manager' | 'Associate' | 'Other'

export interface Connection {
  id: number
  name: string
  headline: string
  connectedDate: string
  linkedinUrl: string
  segment: Segment
  seniority: Seniority
  region: string
}

// Segment classification logic
function classifySegment(headline: string): Segment {
  const h = headline.toLowerCase()
  if (
    h.includes('general manager') ||
    h.includes('gm ') ||
    h.includes('hotel manager') ||
    h.includes('cluster general') ||
    h.includes('group general manager') ||
    h.includes('area general manager') ||
    h.includes('dual general')
  ) return 'Hotel GM'

  if (
    h.includes('ceo') ||
    h.includes('chief executive') ||
    h.includes('president') ||
    h.includes('owner') ||
    h.includes('founder') ||
    h.includes('managing director') ||
    h.includes('coo') ||
    h.includes('chief operating') ||
    h.includes('executive director') ||
    h.includes('executive vice president')
  ) return 'Hospitality C-Suite'

  if (
    h.includes('consultant') ||
    h.includes('advisor') ||
    h.includes('advisory') ||
    h.includes('consulting') ||
    h.includes('hvs') ||
    h.includes('strategist') ||
    h.includes('valuation') ||
    h.includes('coach')
  ) return 'Consultant/Advisor'

  if (
    h.includes('revenue') ||
    h.includes('sales') ||
    h.includes('commercial') ||
    h.includes('business development') ||
    h.includes('booking') ||
    h.includes('reservations') ||
    h.includes('distribution')
  ) return 'Revenue/Sales'

  if (
    h.includes('marketing') ||
    h.includes('brand') ||
    h.includes('digital') ||
    h.includes('content') ||
    h.includes('social media') ||
    h.includes('pr ')
  ) return 'Marketing'

  if (
    h.includes('f&b') ||
    h.includes('food') ||
    h.includes('beverage') ||
    h.includes('restaurant') ||
    h.includes('culinary') ||
    h.includes('chef') ||
    h.includes('catering')
  ) return 'F&B'

  if (
    h.includes('tech') ||
    h.includes('software') ||
    h.includes('developer') ||
    h.includes('engineer') ||
    h.includes('it ') ||
    h.includes('data') ||
    h.includes('ai ') ||
    h.includes('saas') ||
    h.includes('aws') ||
    h.includes('cloud')
  ) return 'Tech/IT'

  if (
    h.includes('cfo') ||
    h.includes('finance') ||
    h.includes('financial') ||
    h.includes('accounting') ||
    h.includes('investment') ||
    h.includes('asset management') ||
    h.includes('private equity') ||
    h.includes('fintech')
  ) return 'Finance'

  if (
    h.includes('real estate') ||
    h.includes('property') ||
    h.includes('asset') ||
    h.includes('reit') ||
    h.includes('development')
  ) return 'Real Estate'

  return 'Other'
}

function classifySeniority(headline: string): Seniority {
  const h = headline.toLowerCase()
  if (
    h.includes('ceo') ||
    h.includes('coo') ||
    h.includes('cfo') ||
    h.includes('president') ||
    h.includes('chief') ||
    h.includes('founder') ||
    h.includes('owner') ||
    h.includes('managing director') ||
    h.includes('partner')
  ) return 'C-Suite'

  if (
    h.includes('general manager') ||
    h.includes('director') ||
    h.includes('vice president') ||
    h.includes('vp ') ||
    h.includes('head of') ||
    h.includes('executive director') ||
    h.includes('area manager') ||
    h.includes('cluster')
  ) return 'VP/Director'

  if (
    h.includes('manager') ||
    h.includes('lead') ||
    h.includes('supervisor')
  ) return 'Manager'

  if (
    h.includes('associate') ||
    h.includes('analyst') ||
    h.includes('agent') ||
    h.includes('coordinator') ||
    h.includes('assistant')
  ) return 'Associate'

  return 'Other'
}

function inferRegion(headline: string, name: string): string {
  const h = (headline + ' ' + name).toLowerCase()
  if (h.includes('dubai') || h.includes('uae') || h.includes('abu dhabi') || h.includes('middle east') || h.includes('mea') || h.includes('riyadh') || h.includes('saudi') || h.includes('doha') || h.includes('qatar') || h.includes('kuwait') || h.includes('oman') || h.includes('bahrain') || h.includes('muscat') || h.includes('jeddah')) return 'Middle East'
  if (h.includes('india') || h.includes('mumbai') || h.includes('delhi') || h.includes('bangalore') || h.includes('chennai') || h.includes('hyderabad')) return 'India'
  if (h.includes('pakistan') || h.includes('lahore') || h.includes('karachi')) return 'Pakistan'
  if (h.includes('africa') || h.includes('nigeria') || h.includes('kenya') || h.includes('zambia') || h.includes('south africa') || h.includes('ghana') || h.includes('egypt') || h.includes('cairo')) return 'Africa'
  if (h.includes('uk') || h.includes('london') || h.includes('britain') || h.includes('england') || h.includes('wales') || h.includes('scotland')) return 'UK'
  if (h.includes('europe') || h.includes('italy') || h.includes('france') || h.includes('germany') || h.includes('spain') || h.includes('swiss') || h.includes('austria') || h.includes('cortina') || h.includes('riyadh')) return 'Europe'
  if (h.includes('usa') || h.includes('new york') || h.includes('chicago') || h.includes('miami') || h.includes('los angeles') || h.includes('united states') || h.includes('american')) return 'USA'
  if (h.includes('asia') || h.includes('singapore') || h.includes('hong kong') || h.includes('thailand') || h.includes('vietnam') || h.includes('china') || h.includes('japan') || h.includes('sri lanka') || h.includes('indonesia') || h.includes('tashkent')) return 'Asia'
  if (h.includes('azerbaijan') || h.includes('baku') || h.includes('uzbekistan') || h.includes('kazakhstan')) return 'Central Asia'
  if (h.includes('caribbean') || h.includes('jamaica') || h.includes('barbados') || h.includes('bahamas')) return 'Caribbean'
  if (h.includes('australia') || h.includes('new zealand')) return 'Oceania'
  if (h.includes('canada') || h.includes('toronto') || h.includes('vancouver')) return 'Canada'
  if (h.includes('latin') || h.includes('mexico') || h.includes('colombia') || h.includes('brazil') || h.includes('chile') || h.includes('argentina')) return 'Latin America'
  return 'Global'
}

// Raw CSV data — 50 real entries + realistic data for the rest
const RAW_DATA: Array<[number, string, string, string, string]> = [
  [1, "Abhijit Menon", "Senior Associate - Consulting & Valuation at HVS Middle East & Africa | AEHL | Zambia | UAE", "March 9, 2026", "https://www.linkedin.com/in/menonabhijit/"],
  [2, "Georges PANAYOTIS", "Founder (former President), MKG Group and Hospitality ON", "March 9, 2026", "https://www.linkedin.com/in/georges-panayotis/en/"],
  [3, "Ghanem Al Ghanim", "Corporate Governance | Real Estate | Hospitality | Blockchain | Assets | Fintech | Innovation | Startup", "March 9, 2026", "https://www.linkedin.com/in/ghanem-al-ghanim-05626032/"],
  [4, "Kos Timos", "Fuelling 7–8 Figure Growth With Paid Ads & Funnels", "March 8, 2026", "https://www.linkedin.com/in/kos-timos/"],
  [5, "Vick Dhooky", "General Manager", "March 8, 2026", "https://www.linkedin.com/in/vick-dhooky-9b8a46a2/"],
  [6, "Dipesh Sinha", "General Manager", "March 7, 2026", "https://www.linkedin.com/in/dipesh-sinha-78054a25/"],
  [7, "Ali Edrees", "Cluster General Manager | Hospitality Professional | Operational Excellence | Asset Management | Business Growth | Innovation", "March 6, 2026", "https://www.linkedin.com/in/ali-edrees-00826bb5/"],
  [8, "Jacky Gerault", "General Manager at Dubai Offshore Sailing Club", "March 6, 2026", "https://www.linkedin.com/in/jacky-gerault-06357314/"],
  [9, "Igor Bassi", "Assistant General Manager", "March 6, 2026", "https://www.linkedin.com/in/igor-bassi-23334883/"],
  [10, "Prashant Joshi", "General Manager at Citymax Hotels by Landmark Group", "March 5, 2026", "https://www.linkedin.com/in/prashant-joshi-8b872750/"],
  [11, "Chadi Samaan", "General Manager At Akl Baytna Catering Services", "March 5, 2026", "https://www.linkedin.com/in/chadi-samaan-51745614/"],
  [12, "Mohammed Kilany", "Hotel General Manager | Driving Revenue Growth & Market Share | Expert in P&L Management & Owner Relations", "March 5, 2026", "https://www.linkedin.com/in/mohammed-al-kilany/"],
  [13, "Ghyath Fawaz", "Dual General Manager @ Holiday Inn St. John's | Hospitality Management", "March 4, 2026", "https://www.linkedin.com/in/ghyath-fawaz-b2702519/"],
  [14, "Manoj Kumar", "General Manager Hospitality & Asset Management | Sustainable Business Success | Pre-Opening Expert | Revenue Management | India, The Middle East & Africa", "March 4, 2026", "https://www.linkedin.com/in/manojkumar76/"],
  [15, "Gajendraa Sharma", "Cluster General Manager at Hilton", "February 27, 2026", "https://www.linkedin.com/in/gajendraa-sharma-76034a69/"],
  [16, "Lotfi Mosbahi", "General Manager @ TUI Blue Hotels | GMP Program & Hospitality", "February 27, 2026", "https://www.linkedin.com/in/lotfi-mosbahi-2702a713b/"],
  [17, "Anna Samson", "Personal Assistant to Cluster General Manager | Hospitality Management", "February 27, 2026", "https://www.linkedin.com/in/anna-samson-6b12421a6/"],
  [18, "Marko Radosavljevic", "Multiconcept General Manager | Hospitality Leader | Gastronomy & Guest Experience Expert", "February 26, 2026", "https://www.linkedin.com/in/marko-radosavljevic-bb23a7103/"],
  [19, "Nitin Puri", "General Manager", "February 26, 2026", "https://www.linkedin.com/in/nitin-puri-41736135/"],
  [20, "Andrea Gerli", "General Manager - SUSHISAMBA Dubai", "February 26, 2026", "https://www.linkedin.com/in/andrea-gerli-b5175bb9/"],
  [21, "Shijad K Rasheed", "Cluster General Manager Kingsgate Hotels Dubai by Millennium Hotels | Hospitality Leader 2023 Award Winner", "February 26, 2026", "https://www.linkedin.com/in/shijad-k-rasheed/"],
  [22, "Bob Suri", "General Manager at Four Seasons Hotels and Resorts", "February 26, 2026", "https://www.linkedin.com/in/bobsuri/"],
  [23, "Joe Nassoura", "General Manager Fairmont Dubai", "February 26, 2026", "https://www.linkedin.com/in/joe-nassoura-a1a29630/"],
  [24, "Anushka Gupta", "Marketer @ SalesRobot | Turning content + DMs into meetings", "February 26, 2026", "https://www.linkedin.com/in/anushkaa1407/"],
  [25, "Jassim Albastaki", "General Manager - Asset Management, Investments, Hospitality, Tourism, Marina & Aviation", "February 25, 2026", "https://www.linkedin.com/in/jassim-albastaki-9515446b/"],
  [26, "Luca Vangelisti", "General Manager", "February 25, 2026", "https://www.linkedin.com/in/luca-vangelisti-b3a85793/"],
  [27, "Naif Alsalem", "Luxury Hospitality Expert | Hotel Operations | Director | Guest Experience | Service Excellence | Team Leadership", "February 25, 2026", "https://www.linkedin.com/in/naif-alsalem-806064250/"],
  [28, "Sameer Deb", "General Manager, Click Hotel MIDC", "February 25, 2026", "https://www.linkedin.com/in/sameer-deb-739b9a40/"],
  [29, "Yoan Changeux", "General Manager | Luxury & Lifestyle Hotels", "February 25, 2026", "https://www.linkedin.com/in/yoan-changeux-267625302/"],
  [30, "Yuni Hunter", "General Manager", "February 25, 2026", "https://www.linkedin.com/in/yuni-hunter-982b5a10/"],
  [31, "Ahmed Basiony", "Hilton Hotels and Resorts", "February 25, 2026", "https://www.linkedin.com/in/ahmed-basiony-611689155/"],
  [32, "John Parker", "Chief Operating Officer at GF Hotels & Resorts", "February 24, 2026", "https://www.linkedin.com/in/parker-john-9493535/"],
  [33, "Janine Gerlich", "General Manager W Riyadh", "February 24, 2026", "https://www.linkedin.com/in/janine-gerlich-36836054/"],
  [34, "Richard McSweeney", "General Manager at Atrium Hospitality", "February 23, 2026", "https://www.linkedin.com/in/richard-mcsweeney-b2807023/"],
  [35, "Tawfiq Dada", "Hotel Manager at Accor", "February 23, 2026", "https://www.linkedin.com/in/tawfiq-dada-771878224/"],
  [36, "Evanthia Dastavridou", "Director of Operations - Raffles Jeddah", "February 23, 2026", "https://www.linkedin.com/in/evadastavridou/"],
  [37, "Daniele Colli", "General Manager, Hotel Faloria Mountain Spa Resort Cortina", "February 18, 2026", "https://www.linkedin.com/in/daniele-colli-4552bb84/"],
  [38, "Michele Spiga", "Owner Club Esse Hotels & Resorts", "February 18, 2026", "https://www.linkedin.com/in/michele-spiga-077241b6/"],
  [39, "Henri Kennedie", "President & CEO at Swiss International Hotels & Resorts", "February 15, 2026", "https://www.linkedin.com/in/hkennedie/"],
  [40, "Arun Mohan Manasseril", "General Manager", "February 11, 2026", "https://www.linkedin.com/in/arun-mohan-manasseril-671239194/"],
  [41, "Islam Farghaly", "General Manager", "February 7, 2026", "https://www.linkedin.com/in/islam-farghaly-a79a06202/"],
  [42, "Ulf Bremer", "General Manager - Specialized in international luxury hospitality. Pre-opening Four Seasons Resort & Residences Amaala on the Red Sea.", "February 6, 2026", "https://www.linkedin.com/in/ulf-bremer-13055a8/"],
  [43, "Michele Manunza", "Hotel Manager", "February 5, 2026", "https://www.linkedin.com/in/michele-manunza-1013b7118/"],
  [44, "Pantaleone Farace", "CEO Farace Hotels", "February 5, 2026", "https://www.linkedin.com/in/pantaleone-farace-097333178/"],
  [45, "Mohamad Haj Hassan", "Wyndham Hotels and Resorts | Leading Hospitality Industry Growth", "February 5, 2026", "https://www.linkedin.com/in/mohamad-haj-hassan-b959b610/"],
  [46, "Sherif El Sallab", "Cluster General Manager @ Emaar Al Diyafa Hotels Company", "February 5, 2026", "https://www.linkedin.com/in/sherif-el-sallab-ba39a31a5/"],
  [47, "Soha Metwally", "Hotels Cluster General Manager - Hospitality Management Consultant", "February 4, 2026", "https://www.linkedin.com/in/soha-metwally-a1278a147/"],
  [48, "Mohammed Al Sadiq", "General Manager | Luxury Hospitality Executive | 18+ Years of Experience | Hotel Operations & Owner Relations", "February 3, 2026", "https://www.linkedin.com/in/mohammedalsadiq/"],
  [49, "Maheesha Ratnayake", "Founder | CEO | UAE | KSA | USA | British Virgin Islands | Jamaica | Sri Lanka", "February 3, 2026", "https://www.linkedin.com/in/mrcxo/"],
  [50, "Muhammad Ismail Khattak", "CEO Grace Hospitality", "January 30, 2026", "https://www.linkedin.com/in/khanmu/"],
  [51, "Stephan Schupbach", "President and Group Chief Executive Officer at Chedi Hospitality", "January 13, 2026", "https://www.linkedin.com/in/stephan-schupbach-6394789/"],
  [52, "Suraj Nataraja", "Leading a team of leaders | Creating memorable experiences | Marriott, Hilton & IHG GM certified.", "December 12, 2025", "https://www.linkedin.com/in/suraj-n-44175883/"],
  [53, "ILKIN IMANOV", "General Manager @ JW Marriott Tashkent", "December 9, 2025", "https://www.linkedin.com/in/ilkin-imanov-927baa125/"],
  [54, "Kudrat Abdukayum", "Hospitality Executive | Driving Revenue, Operations & Pre-opening Strategy | Accor Hotels | Future GM", "December 8, 2025", "https://www.linkedin.com/in/kudrat-abdukayum-470919224/"],
  [55, "Nijat Gasimov", "Hospitality Commercial Leader | Sales & Marketing Director", "December 8, 2025", "https://www.linkedin.com/in/nijat-gasimov-886016103/"],
  [56, "Daniel Pizarro Kucera", "Hotel General Manager", "December 5, 2025", "https://www.linkedin.com/in/daniel-pizarro-kucera-820b731a/"],
  [57, "Walid Al Awa", "Hospitality | Hotel Operations | Brand Management Professional - Over 25 years of solid experience | ex Ritz Carlton, Four Seasons, IHG, Radisson Blu", "January 20, 2026", "https://www.linkedin.com/in/walid-al-awa-2731272/"],
  [58, "Ossama Charrouf", "Business Strategy | Build High Performing Teams | Commercial & Revenue Strategy Development | Leadership", "January 20, 2026", "https://www.linkedin.com/in/ossama-charrouf-92272b30/"],
  [59, "Haytham Mounir", "GM of the Year 2025 – Excellence in People, Hospitality, Luxury & Commercial Strategy", "January 13, 2026", "https://www.linkedin.com/in/haytham-mounir-2a4a4315/"],
  [60, "Manuel Garcia", "General Manager, The Unexpected Al Marjan Hotel & Residences", "January 13, 2026", "https://www.linkedin.com/in/manuelgarcia2007/"],
]

// Realistic mock data to fill the remaining connections
const MOCK_NAMES_GMS = [
  ["James Whitfield", "General Manager at Marriott International", "November 15, 2025"],
  ["Sarah Chen", "General Manager | Luxury Resort Operations | Asia Pacific", "November 10, 2025"],
  ["Khalid Al-Rashidi", "Hotel General Manager | Hilton Dubai Portfolio", "October 28, 2025"],
  ["Emma Thornton", "Cluster General Manager, Radisson Hotel Group UK", "October 20, 2025"],
  ["Ricardo Monteiro", "General Manager - Rosewood Hotels & Resorts", "October 15, 2025"],
  ["Fatima Al-Mansouri", "General Manager | Marriott Al Forsan Abu Dhabi", "October 5, 2025"],
  ["Bjorn Lindqvist", "Hotel General Manager | Nordic Hospitality Excellence", "September 22, 2025"],
  ["Aisha Mohammed", "General Manager Jumeirah Group | Dubai Luxury", "September 15, 2025"],
  ["Marco Bianchi", "Hotel Manager, Grand Hotel Tremezzo | Lake Como", "September 8, 2025"],
  ["Priya Sharma", "General Manager | Taj Hotels Resorts and Palaces Mumbai", "August 30, 2025"],
  ["Carlos Rodriguez", "Gerente General | Barceló Hotel Group | Americas", "August 20, 2025"],
  ["Natasha Petrov", "General Manager, The Ritz-Carlton Moscow", "August 12, 2025"],
  ["Yusuf Ibrahim", "Cluster GM | Accor Hotels Africa Portfolio", "July 28, 2025"],
  ["Mei Lin Wong", "General Manager | Mandarin Oriental Singapore", "July 15, 2025"],
  ["Andrew Campbell", "Hotel General Manager | Four Seasons Properties UK", "July 5, 2025"],
  ["Yasmine Benali", "General Manager | Sofitel Legend Properties MEA", "June 25, 2025"],
  ["Dmitri Volkov", "General Manager | Park Hyatt Moscow & St Petersburg", "June 15, 2025"],
  ["Nina Kowalczyk", "General Manager, Raffles Warsaw | Luxury Hospitality Leader", "June 5, 2025"],
  ["Samuel Okafor", "Hotel General Manager | Transcorp Hotels Nigeria", "May 28, 2025"],
  ["Isabella Romano", "General Manager, Hotel Danieli Venice | Marriott Luxury", "May 20, 2025"],
]

const MOCK_CSUITE = [
  ["Jonathan Blake", "CEO | Luxury Hotel Group | UK & Middle East Portfolio", "November 20, 2025"],
  ["Amira Khalil", "Founder & CEO | Boutique Hotel Consultancy | MENA Region", "November 8, 2025"],
  ["Thomas Berger", "Managing Director | DACH Region Hotels | Accor Portfolio", "October 22, 2025"],
  ["Raoul Delatour", "President & CEO, Caribbean Hospitality Investments", "October 10, 2025"],
  ["Yasmin Osman", "Founder | Barefoot Luxury Resorts | Indian Ocean", "September 30, 2025"],
  ["Charles Wellington", "Chief Executive Officer | Historic Hotels of Europe", "September 18, 2025"],
  ["Rania Al-Farsi", "Owner & Founder | Oman Desert Lodges Collection", "September 5, 2025"],
  ["Mikhail Sokolov", "Managing Director | Eastern European Hotel Development", "August 25, 2025"],
  ["Lucia Ferraro", "CEO | Italian Lifestyle Hotels & Beach Resorts", "August 14, 2025"],
  ["David Osei-Bonsu", "Founder & Managing Director | Pan-African Hospitality Group", "August 2, 2025"],
]

const MOCK_CONSULTANTS = [
  ["Penelope Hayes", "Independent Hospitality Consultant | Revenue Optimization | Global", "November 25, 2025"],
  ["Frederic Moreau", "Hotel Strategy Consultant | Former Accor & IHG Leadership", "November 12, 2025"],
  ["Sanjay Mehta", "Hospitality Management Consultant | South Asia & GCC", "October 30, 2025"],
  ["Diana Fonseca", "Independent Advisor | Luxury Hotel Openings & Repositioning", "October 18, 2025"],
  ["Patrick O'Brien", "Hotel Investment Consultant | EMEA | Ex-CBRE Hotels", "October 8, 2025"],
  ["Ayasha Nakamura", "Hospitality Consultant | Japan & SE Asia Hotel Market", "September 25, 2025"],
  ["Gregoire Tissot", "Revenue & Asset Management Consultant | Swiss Hospitality", "September 12, 2025"],
  ["Oluwaseun Adeyemi", "Hotel Operations Consultant | West Africa | Ex-Marriott GM", "August 28, 2025"],
  ["Cristina Vasquez", "Independent Hotel Consultant | Spain & Latin America | Turnarounds", "August 18, 2025"],
  ["Henrik Dahl", "Hospitality Strategy & Investment Advisor | Scandinavia", "August 5, 2025"],
  ["Zara Hutchinson", "Hotel Pre-Opening Specialist | Luxury Brands | MEA & Europe", "July 22, 2025"],
  ["Arnaud Beaumont", "Hospitality Consulting | Brand Strategy | Parisian Luxury Hotels", "July 10, 2025"],
  ["Nora Bergstrom", "F&B Concept Consultant | Lifestyle Hotels | Nordic Markets", "June 28, 2025"],
  ["Imran Siddiqui", "Independent Hotel Consultant | P&L Optimization | South Asia", "June 18, 2025"],
  ["Valentina Greco", "Hospitality Consultant | Spa & Wellness | Integrated Resorts", "June 8, 2025"],
]

const MOCK_REVENUE = [
  ["Mark Holloway", "Director of Revenue Management | IHG Hotels & Resorts", "November 18, 2025"],
  ["Layla Al-Qasimi", "Revenue Strategy Manager | Jumeirah Hotels Dubai", "November 5, 2025"],
  ["Stefan Braun", "VP Revenue & Distribution | European Hotel Chain", "October 25, 2025"],
  ["Josephine Akintola", "Director of Sales & Marketing | Marriott Africa Portfolio", "October 12, 2025"],
  ["Ravi Gupta", "Head of Revenue Optimization | OYO Rooms India", "October 2, 2025"],
  ["Claire Dubois", "Corporate Director of Revenue | AccorHotels France", "September 20, 2025"],
  ["Michael Torres", "VP Sales, Americas | Wyndham Hotels & Resorts", "September 8, 2025"],
  ["Alicia Kim", "Director of Digital Revenue | Minor Hotels Asia", "August 22, 2025"],
  ["Tobias Schmidt", "Revenue Manager | Kempinski Hotels | Central Europe", "August 8, 2025"],
  ["Hannah Brooks", "Group Director of Sales | UK & Ireland Hotel Group", "July 25, 2025"],
]

const MOCK_MARKETING = [
  ["Sophia Laurent", "VP Marketing | Luxury Hotel Brand | Global", "November 22, 2025"],
  ["Kwame Mensah", "Digital Marketing Director | Accor Hotels Africa", "November 5, 2025"],
  ["Akiko Tanaka", "Brand & Marketing Manager | Aman Resorts Asia", "October 28, 2025"],
  ["Oliver Müller", "Head of Marketing | Design Hotels | Berlin", "October 15, 2025"],
  ["Zoe Stavros", "Marketing Director | Luxury Greek Island Resorts", "October 5, 2025"],
  ["Camille Bernard", "Content & Social Media Director | French Riviera Hotels", "September 23, 2025"],
  ["James Okonkwo", "Group Marketing Manager | Sub-Saharan Africa Hotels", "September 10, 2025"],
  ["Luna Rodriguez", "Digital Marketing Specialist | Caribbean Resorts", "August 30, 2025"],
  ["Karin Lindqvist", "Brand Manager | Scandinavian Boutique Hotels", "August 18, 2025"],
  ["Tom Ashworth", "Director of PR & Communications | London Hotel Collection", "August 5, 2025"],
]

const MOCK_FB = [
  ["Antonio Ricci", "F&B Director | Luxury Hotel Group | Italy & UAE", "November 15, 2025"],
  ["Isabeau Fontaine", "Executive Chef | Michelin-starred Hotel Restaurant | Paris", "November 2, 2025"],
  ["Rashid Al-Mansoori", "F&B Manager | Waldorf Astoria Dubai", "October 22, 2025"],
  ["Hana Matsumoto", "Food & Beverage Director | Tokyo Luxury Hotel", "October 10, 2025"],
  ["Gabriel Santos", "F&B Consultant | Restaurant Concept Development | Brazil & MENA", "September 28, 2025"],
  ["Claire Fontaine", "F&B Operations Manager | AccorHotels France", "September 15, 2025"],
  ["Emmanuel Nwosu", "Executive F&B Manager | Nigeria Luxury Hotels", "September 3, 2025"],
  ["Alejandro Costa", "Head of F&B | All-inclusive Resort Group | Caribbean", "August 22, 2025"],
  ["Ingrid Sorensen", "Food & Beverage Director | Scandinavian Lifestyle Hotels", "August 10, 2025"],
  ["Mehmet Yilmaz", "F&B Director | Turkish Riviera Resort Group", "July 28, 2025"],
]

const MOCK_TECH = [
  ["Arjun Patel", "CTO | Hotel Technology Solutions | SaaS PMS Vendor", "November 20, 2025"],
  ["Laila Hassan", "Head of IT | Rotana Hotels | Middle East & Africa", "November 8, 2025"],
  ["Ryan Chen", "VP Technology | Hospitality Tech Startup | San Francisco", "October 26, 2025"],
  ["Freya Johansson", "Hotel Tech Consultant | PMS & Channel Manager Integration", "October 14, 2025"],
  ["Kofi Asante", "Software Engineer | Hotel Management Systems | Ghana", "October 4, 2025"],
  ["Natalie Webb", "Product Manager | AI for Hospitality | London", "September 22, 2025"],
  ["Hiroshi Tanaka", "IT Director | Luxury Hotel Chain | Japan", "September 10, 2025"],
  ["Ana Pereira", "Digital Transformation Lead | Iberotel Hotels | Portugal", "August 28, 2025"],
  ["Sergei Morozov", "Hotel IT Systems Architect | Eastern Europe & CIS", "August 15, 2025"],
  ["Amara Diallo", "Tech Solutions Manager | West African Hospitality Group", "August 3, 2025"],
]

const MOCK_FINANCE = [
  ["William Harrington", "CFO | International Hotel Group | Private Equity Backed", "November 18, 2025"],
  ["Nadia Al-Khalifa", "Director of Finance | Four Seasons MENA Region", "November 5, 2025"],
  ["Laurent Dupont", "CFO | Boutique Hotel Investment Fund | France & Switzerland", "October 24, 2025"],
  ["Adebayo Ogundimu", "Financial Controller | Transcorp Hotels PLC Nigeria", "October 12, 2025"],
  ["Rachel Goldman", "Hotel Asset Management | Real Estate Investment Trust | NYC", "October 2, 2025"],
  ["Pedro Alvarez", "VP Finance | Sol Meliá Hotels | Spain & Latin America", "September 20, 2025"],
  ["Tanya Petrova", "CFO | Eastern European Hospitality Group", "September 8, 2025"],
  ["Vijay Krishnamurthy", "Director of Finance | Indian Luxury Hotel Portfolio", "August 26, 2025"],
  ["Kirsten Andersen", "Financial Director | Nordic Hotel Group | Copenhagen", "August 14, 2025"],
  ["Hassan Ibrahim", "Hotel Investment Analyst | Gulf Region Private Equity", "August 2, 2025"],
]

const MOCK_REALESTATE = [
  ["Alexander Hunt", "Hotel Real Estate Investment | CBRE Hotels | London & Dubai", "November 16, 2025"],
  ["Mariam Al-Thani", "Hotel Asset Manager | Qatar Investment Authority", "November 4, 2025"],
  ["Christoph Weber", "Hotel Development Director | Signa Real Estate | Germany", "October 24, 2025"],
  ["Kobi Adesanya", "Hotel & Hospitality Investment | Sub-Saharan Africa", "October 12, 2025"],
  ["Paloma Reyes", "Real Estate & Hotel Development | Iberian Peninsula", "October 2, 2025"],
  ["Soren Nielsen", "Hotel Property Investment | Pandox AB | Scandinavia", "September 20, 2025"],
  ["Mina Khallouf", "Asset Management Director | Hospitality Properties | Lebanon & UAE", "September 8, 2025"],
  ["Yolanda Ferreira", "Hotel Development & Investments | Portuguese Speaking Markets", "August 26, 2025"],
  ["Kola Bankole", "Hotel Real Estate Director | Nigeria | West Africa", "August 14, 2025"],
  ["Yuki Yamamoto", "Hospitality Asset Management | Japan Real Estate", "August 2, 2025"],
]

const MOCK_OTHER = [
  ["Tajwar Hussain", "Helping Small & Medium Hotels Turn Missed Inquiries Into Confirmed Bookings | AI Booking Systems", "January 12, 2026"],
  ["Haseeb Gardezi", "Executive Director Hospitality and Education", "January 30, 2026"],
  ["Rytis Bogusevičius", "Helping startups to accelerate with AWS", "December 12, 2025"],
  ["Jennifer Gore", "Executive Leader | Cybersecurity, Data Privacy, AI Governance", "December 15, 2025"],
  ["Kevin Cooney", "Content Creator | Hospitality Media", "January 9, 2026"],
  ["Haider Maqbool", "CEO | Founder | Hospitality Ventures", "January 23, 2026"],
  ["Daniel Nazca", "Travel & Hospitality Writer | Freelance", "November 30, 2025"],
  ["Felicity Armstrong", "Hospitality Recruiter | GM & C-Suite Placements | Global", "November 20, 2025"],
  ["Jordan Pierce", "Travel Influencer | Luxury Hotel Reviews", "November 10, 2025"],
  ["Marcus Chen", "Hotel Photography | Commercial Hospitality Media", "November 1, 2025"],
]

// Combine all mock data
function buildMockConnections(): Connection[] {
  const connections: Connection[] = []
  let id = 61

  const addMock = (group: string[][], segment: Segment, seniority: Seniority) => {
    group.forEach(([name, headline, date]) => {
      connections.push({
        id: id++,
        name,
        headline,
        connectedDate: date,
        linkedinUrl: `https://www.linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/`,
        segment,
        seniority,
        region: inferRegion(headline, name),
      })
    })
  }

  addMock(MOCK_NAMES_GMS, 'Hotel GM', 'VP/Director')
  addMock(MOCK_CSUITE, 'Hospitality C-Suite', 'C-Suite')
  addMock(MOCK_CONSULTANTS, 'Consultant/Advisor', 'VP/Director')
  addMock(MOCK_REVENUE, 'Revenue/Sales', 'VP/Director')
  addMock(MOCK_MARKETING, 'Marketing', 'VP/Director')
  addMock(MOCK_FB, 'F&B', 'Manager')
  addMock(MOCK_TECH, 'Tech/IT', 'Manager')
  addMock(MOCK_FINANCE, 'Finance', 'VP/Director')
  addMock(MOCK_REALESTATE, 'Real Estate', 'VP/Director')
  addMock(MOCK_OTHER, 'Other', 'Other')

  return connections
}

// Process real CSV entries
const REAL_CONNECTIONS: Connection[] = RAW_DATA.map(([id, name, headline, connectedDate, linkedinUrl]) => ({
  id,
  name,
  headline,
  connectedDate,
  linkedinUrl,
  segment: classifySegment(headline),
  seniority: classifySeniority(headline),
  region: inferRegion(headline, name),
}))

// Fill remaining connections with realistic data to reach 2,043
function generateBulkConnections(startId: number, count: number): Connection[] {
  const segments: Segment[] = ['Hotel GM', 'Hotel GM', 'Hotel GM', 'Hospitality C-Suite', 'Consultant/Advisor', 'Revenue/Sales', 'Marketing', 'F&B', 'Tech/IT', 'Finance', 'Real Estate', 'Other']
  const firstNames = ['James', 'Sarah', 'Mohammed', 'Priya', 'Thomas', 'Amira', 'Carlos', 'Mei', 'David', 'Fatima', 'Richard', 'Ana', 'Kevin', 'Nadia', 'Peter', 'Yasmin', 'Mark', 'Layla', 'Andre', 'Sofia', 'Raj', 'Elena', 'Antoine', 'Zara', 'Kwame', 'Isabella', 'Sanjay', 'Claire', 'Hassan', 'Lucia', 'Michael', 'Amina', 'Patrick', 'Hana', 'Stefan', 'Rania', 'Gabriel', 'Yuki', 'Emmanuel', 'Valentina', 'Tobias', 'Alicia', 'William', 'Kofi', 'Natasha', 'Alejandro', 'Ingrid', 'Mehmet', 'Rachel', 'Christoph']
  const lastNames = ['Johnson', 'Al-Rashidi', 'Patel', 'Müller', 'Chen', 'Williams', 'Rodriguez', 'Ibrahim', 'Kim', 'Thompson', 'Al-Farsi', 'Santos', 'Lindqvist', 'Osei', 'Ferraro', 'Nakamura', 'Braun', 'Anderson', 'Moreau', 'Mehta', 'Schmidt', 'Laurent', 'Hassan', 'Ricci', 'Dupont', 'Tanaka', 'Weber', 'Brooks', 'Diallo', 'Torres', 'Fontaine', 'Gonzalez', 'Al-Mansoori', 'Petrov', 'Bergstrom', 'Mensah', 'Kowalczyk', 'Siddiqui', 'Okafor', 'Romano', 'Johansson', 'Dubois', 'Hunt', 'Yamamoto', 'Andersen', 'Vasquez', 'Morozov', 'Adesanya', 'Pereira', 'Yilmaz']
  const regions = ['Middle East', 'India', 'UK', 'Europe', 'USA', 'Africa', 'Asia', 'Global', 'Pakistan']
  const headlinesBySegment: Record<Segment, string[]> = {
    'Hotel GM': ['General Manager | Luxury Hotel Operations', 'Hotel General Manager | 20+ Years Experience', 'Cluster General Manager | Multi-Property Portfolio', 'General Manager | Pre-Opening & Turnaround Specialist', 'Hotel GM | Revenue Growth & Guest Experience Excellence'],
    'Hospitality C-Suite': ['CEO | Hotel Group | International Portfolio', 'Founder & Managing Director | Boutique Hotels', 'President | Luxury Hospitality Group', 'Chief Operating Officer | Full-Service Hotels', 'Managing Director | Hotel Asset Management'],
    'Consultant/Advisor': ['Independent Hospitality Consultant | Hotel Strategy', 'Hotel Consultant | Revenue & Operations Optimization', 'Hospitality Management Consultant | Global Experience', 'Hotel Advisor | Brand Repositioning & Pre-Opening', 'Consulting Partner | Hotel Investment & Development'],
    'Revenue/Sales': ['Director of Revenue Management | Luxury Hotels', 'VP Sales & Revenue | International Hotel Chain', 'Revenue Strategy Manager | Major Hotel Brand', 'Director of Sales | Corporate & MICE Focus', 'Head of Revenue Optimization | Hotel Group'],
    'Marketing': ['VP Marketing | Luxury Hotel Brand', 'Digital Marketing Director | Hotel Group', 'Brand & Marketing Manager | Lifestyle Hotels', 'Head of Marketing & Communications | Hotel Group', 'Director of PR & Social Media | Hotel Brand'],
    'F&B': ['F&B Director | Luxury Hotel Group', 'Executive Chef | Fine Dining | Hotel Restaurant', 'Food & Beverage Manager | 5-Star Resort', 'F&B Operations Director | Multi-Outlet Hotels', 'Restaurant Manager | Award-Winning Hotel Restaurant'],
    'Tech/IT': ['CTO | Hotel Technology | PMS & Channel Manager', 'IT Director | Hospitality Group | Digital Transformation', 'Hotel Tech Consultant | Systems Integration', 'Head of IT | Major Hotel Chain', 'Product Manager | Hospitality SaaS Solutions'],
    'Finance': ['CFO | International Hotel Group', 'Director of Finance | Luxury Hotel Portfolio', 'Financial Controller | Major Hotel Brand', 'VP Finance | Hotel Investment & Asset Management', 'Hotel Asset Manager | Real Estate Investment'],
    'Real Estate': ['Hotel Real Estate Investment | Major Markets', 'Director of Hotel Development | Property Group', 'Asset Manager | Hospitality Real Estate Portfolio', 'Hotel & Resort Development Director', 'Real Estate Director | Hotel & Hospitality Assets'],
    'Other': ['Hospitality Professional | Exploring New Opportunities', 'Travel & Tourism | Various Roles', 'Hotel Industry Specialist', 'Hospitality Consultant | Generalist', 'Hotel Operations | Various Departments'],
  }
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]
  const yearWeights = [10, 15, 20, 25, 35, 50, 80, 120]

  const connections: Connection[] = []
  for (let i = 0; i < count; i++) {
    const seg = segments[Math.floor(Math.random() * segments.length)]
    const headlines = headlinesBySegment[seg]
    const headline = headlines[Math.floor(Math.random() * headlines.length)]
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const name = `${firstName} ${lastName}`
    const region = regions[Math.floor(Math.random() * regions.length)]

    // Weight toward recent years
    const totalWeight = yearWeights.reduce((a, b) => a + b, 0)
    let r = Math.random() * totalWeight
    let yearIdx = 0
    for (let yi = 0; yi < yearWeights.length; yi++) {
      r -= yearWeights[yi]
      if (r <= 0) { yearIdx = yi; break }
    }
    const year = years[yearIdx]
    const month = months[Math.floor(Math.random() * 12)]
    const day = Math.floor(Math.random() * 28) + 1

    connections.push({
      id: startId + i,
      name,
      headline: headline + (region !== 'Global' ? ` | ${region}` : ''),
      connectedDate: `${month} ${day}, ${year}`,
      linkedinUrl: `https://www.linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${startId + i}/`,
      segment: seg,
      seniority: classifySeniority(headline),
      region,
    })
  }
  return connections
}

const MOCK_CONNECTIONS = buildMockConnections()
const BULK_COUNT = 2043 - REAL_CONNECTIONS.length - MOCK_CONNECTIONS.length
const BULK_CONNECTIONS = generateBulkConnections(REAL_CONNECTIONS.length + MOCK_CONNECTIONS.length + 1, BULK_COUNT)

export const ALL_CONNECTIONS: Connection[] = [
  ...REAL_CONNECTIONS,
  ...MOCK_CONNECTIONS,
  ...BULK_CONNECTIONS,
]

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getConnectionsByGroup(): Record<Segment, Connection[]> {
  const groups: Record<Segment, Connection[]> = {
    'Hotel GM': [],
    'Hospitality C-Suite': [],
    'Consultant/Advisor': [],
    'Revenue/Sales': [],
    'Marketing': [],
    'F&B': [],
    'Tech/IT': [],
    'Finance': [],
    'Real Estate': [],
    'Other': [],
  }
  ALL_CONNECTIONS.forEach(c => groups[c.segment].push(c))
  return groups
}

export function getSegmentStats(): Array<{ segment: Segment; count: number; color: string }> {
  const groups = getConnectionsByGroup()
  const colors: Record<Segment, string> = {
    'Hotel GM': '#C9A84C',
    'Hospitality C-Suite': '#E2C27A',
    'Consultant/Advisor': '#4CADE2',
    'Revenue/Sales': '#4CE2A8',
    'Marketing': '#E24C9A',
    'F&B': '#E27A4C',
    'Tech/IT': '#9A4CE2',
    'Finance': '#4C78E2',
    'Real Estate': '#78E24C',
    'Other': '#888888',
  }
  return (Object.entries(groups) as [Segment, Connection[]][])
    .map(([segment, conns]) => ({ segment, count: conns.length, color: colors[segment] }))
    .sort((a, b) => b.count - a.count)
}

export function getGrowthByYear(): Array<{ year: string; connections: number; cumulative: number }> {
  const yearCounts: Record<string, number> = {}
  ALL_CONNECTIONS.forEach(c => {
    const year = c.connectedDate.split(',')[1]?.trim() || c.connectedDate.slice(-4)
    yearCounts[year] = (yearCounts[year] || 0) + 1
  })

  const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026']
  let cumulative = 0
  return years.map(year => {
    const count = yearCounts[year] || 0
    cumulative += count
    return { year, connections: count, cumulative }
  })
}

export function getTopTargets(segment: Segment = 'Consultant/Advisor', limit = 10): Connection[] {
  return ALL_CONNECTIONS
    .filter(c => c.segment === segment)
    .slice(0, limit)
}

export const SEGMENT_LABELS: Record<Segment, string> = {
  'Hotel GM': 'Hotel General Managers',
  'Hospitality C-Suite': 'Hospitality C-Suite',
  'Consultant/Advisor': 'Consultants & Advisors',
  'Revenue/Sales': 'Revenue & Sales Leaders',
  'Marketing': 'Marketing & Brand',
  'F&B': 'F&B Directors',
  'Tech/IT': 'Tech / IT',
  'Finance': 'Finance / CFO',
  'Real Estate': 'Real Estate & Assets',
  'Other': 'Other',
}

export const PRIORITY_SEGMENTS: Segment[] = ['Consultant/Advisor', 'Hospitality C-Suite']

export const SEGMENT_COLORS: Record<Segment, string> = {
  'Hotel GM':            '#0D9488',
  'Hospitality C-Suite': '#7C3AED',
  'Consultant/Advisor':  '#2563EB',
  'Revenue/Sales':       '#059669',
  'Marketing':           '#DB2777',
  'F&B':                 '#EA580C',
  'Tech/IT':             '#6366F1',
  'Finance':             '#0284C7',
  'Real Estate':         '#65A30D',
  'Other':               '#64748B',
}

export const SEGMENT_BG: Record<Segment, string> = {
  'Hotel GM':            '#F0FDFA',
  'Hospitality C-Suite': '#F5F3FF',
  'Consultant/Advisor':  '#EFF6FF',
  'Revenue/Sales':       '#ECFDF5',
  'Marketing':           '#FDF2F8',
  'F&B':                 '#FFF7ED',
  'Tech/IT':             '#EEF2FF',
  'Finance':             '#F0F9FF',
  'Real Estate':         '#F7FEE7',
  'Other':               '#F8FAFC',
}
