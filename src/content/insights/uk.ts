import type { Article } from "./types";

const D = "2026-11-11";

export const UK_ARTICLES: Article[] = [
  {
    market: "uk",
    slug: "investing-in-rwanda-from-london",
    lang: "en-GB",
    title: "Investing in Rwanda from London: What UK Businesses Need to Know",
    metaTitle: "Investing in Rwanda from London: UK Guide",
    description:
      "Why London-based investors and companies are looking at Rwanda, how to set up from the UK, and the practical differences to plan for.",
    keywords: ["invest in Rwanda from UK", "Rwanda business London", "UK investors Africa", "Kigali investment", "Commonwealth business Rwanda"],
    category: "Market entry",
    date: D,
    readMinutes: 8,
    image: "/assets/images/kiga1.jpeg",
    imageAlt: "Kigali city skyline at dusk with the Kigali Convention Centre",
    service: { href: "/investment", label: "Investment & business setup in Rwanda" },
    body: `
For a London business thinking about East Africa, Rwanda is often the most comfortable first step. It is a member of the Commonwealth, English is a working language of government and business, RwandAir flies directly between Heathrow and Kigali, and the country has built a reputation for clean, predictable administration that UK compliance teams appreciate. None of that makes Rwanda the biggest opportunity on the continent. It makes it one of the easiest places to begin.

This guide sets out why UK investors are paying attention, how a set-up from London actually works, and the differences that are worth planning for before you commit.

## Why Rwanda appeals to UK businesses

The first thing most UK boards notice is familiarity. Rwanda has been a member of the Commonwealth since 2009, and English is part of everyday business life. Contracts, banking documents and government portals are available in English. Meetings run on time, emails get answered, and the business culture, while more relationship-driven than London's, will not feel foreign to anyone who has worked internationally.

The second is the quality of administration. Rwanda ranked second in Africa in the World Bank's final Doing Business report and is consistently rated among the least corrupt countries on the continent. Company registration, tax filing and many permits are handled online with published fees. For a UK company bound by the Bribery Act, that transparency is not a nice-to-have; it is what makes a market investable.

The third is reach. Rwanda belongs to the East African Community, which now has eight members and more than 300 million people, and to the African Continental Free Trade Area. A Kigali base can serve customers in Kenya, Uganda, Tanzania and beyond while the business itself sits in one of the region's most stable environments. Many British readers know the country from football as well: Arsenal's "Visit Rwanda" sleeve partnership made the name familiar to millions of fans.

## How UK companies usually enter

Most of the London companies we work with choose one of three routes. The most common is a Rwandan subsidiary, a private limited company owned by the UK parent. It keeps liabilities in Rwanda, it is what Rwandan clients and regulators expect to contract with, and it gives full access to investment incentives. Some professional services firms prefer to register a branch of the UK company, which can be simpler to explain internally but leaves the parent directly exposed to everything that happens in Rwanda. Groups that plan to own several African operations sometimes set up a holding company under the Kigali International Financial Centre framework.

We compare the first two in detail in [UK company in Rwanda: subsidiary or branch?](/uk/uk-company-subsidiary-or-branch-in-rwanda).

## Setting up without leaving London

Company registration is handled online by the Rwanda Development Board. There is no government fee and no minimum capital for a private company, and registration automatically generates the company's tax identification number. A UK parent company will need its certificate of incorporation, its articles, a board resolution approving the investment and details of its persons with significant control, generally notarised and apostilled through the FCDO's legalisation service. Individual shareholders and directors simply provide passport scans.

The certificate of incorporation can arrive within a working day of a complete filing. The steps that follow take longer and deserve as much attention: opening a corporate bank account, registering with the Rwanda Social Security Board before hiring, VAT registration where needed, and any sector licence. Our [business registration service](/business-registration) handles that whole sequence.

## What incentives can a UK investor expect?

Foreign investors committing at least USD 250,000 can apply to the Rwanda Development Board for an investment certificate. Depending on the sector and the size of the project, it can unlock a preferential corporate tax rate of 15% instead of the standard 28%, a 50% first-year deduction on qualifying assets, customs relief on certain equipment and easier immigration for key staff. Regional headquarters and certain holding structures can access lower rates still, subject to strict substance requirements.

UK groups should also think about the home side early. The treatment of dividends from a foreign subsidiary, or of branch profits under the UK's branch exemption election, depends on the group's circumstances, and large groups need to consider the global minimum tax. Your UK adviser should be part of the conversation from the outset; we work alongside them regularly.

## The practical differences worth planning for

Time zones are easy. Kigali is on UTC+2, so it is two hours ahead of London in winter and one hour ahead in summer. Your teams share most of the working day, which makes Rwanda far easier to manage from London than Asia or the Americas.

Currency needs a policy. Larger contracts are often priced in US dollars, while salaries, rent and most local costs are in Rwandan francs. Decide early which currency you will invoice in and how you will hold cash.

Payments work differently. Mobile money, mainly MTN MoMo and Airtel Money, is how much of the economy pays, and your local team will expect to use it for everyday expenses.

The legal system is a blend. Rwanda's legal tradition mixes civil and common law influences. Its commercial courts and the Kigali International Arbitration Centre are well regarded, but you still need local counsel to review contracts, particularly employment contracts and leases.

The pace of decisions varies. Government processes are digital and often fast. Private-sector decisions can take longer and are built on personal relationships, which is why a visit early in the process pays for itself.

## What a first year looks like

A typical London company moving into Rwanda spends the first month agreeing its structure, registering the company and starting the bank account application. The second month brings the investment certificate if the company is eligible, any sector licences and the first local hires, usually a country manager and an operations lead. Between months three and six the office is set up, work permits are issued for any UK staff, and the first contracts are signed. From then on, the rhythm is monthly tax filings, payroll and an annual return, which most companies outsource in their first years.

## Let us be your team on the ground

Bonet Elite Services is based in Kigali and handles incorporation, incentives, recruitment, permits, housing and executive travel for UK clients. We keep London hours on WhatsApp and coordinate with your UK advisers. If you are planning a scoping visit first, read our [business travel guide from London to Kigali](/uk/kigali-business-travel-guide-from-london), or book a [free 30-minute consultation](/contact) to talk through your plans.
`,
    faqs: [
      { q: "Is English widely used for business in Rwanda?", a: "Yes. English is an official language and the main working language for business, banking and government services, alongside Kinyarwanda, French and Swahili." },
      { q: "Are there direct flights from London to Kigali?", a: "RwandAir operates direct flights between London Heathrow and Kigali. Other airlines connect via hubs such as Doha, Istanbul, Addis Ababa, Amsterdam and Brussels." },
      { q: "Can a UK company own 100% of a Rwandan subsidiary?", a: "Yes. Rwanda allows 100% foreign ownership in most sectors, with no requirement for a local shareholder." },
      { q: "What is the corporate tax rate in Rwanda?", a: "The standard rate is 28%. Investors with an RDB investment certificate in priority sectors may qualify for a 15% preferential rate, and larger headquarters and holding structures for lower rates." },
    ],
  },
  {
    market: "uk",
    slug: "uk-company-subsidiary-or-branch-in-rwanda",
    lang: "en-GB",
    title: "UK Company in Rwanda: Should You Open a Subsidiary or a Branch?",
    metaTitle: "UK Company in Rwanda: Subsidiary or Branch?",
    description:
      "The legal, tax and practical differences between a Rwandan subsidiary and a branch of a UK company, and which one suits your business.",
    keywords: ["UK subsidiary Rwanda", "foreign branch Rwanda", "register UK company in Rwanda", "Rwanda company structure", "expand to Rwanda"],
    category: "Company setup",
    date: D,
    readMinutes: 7,
    image: "/assets/images/cert.jpg",
    imageAlt: "Aerial view of the Kigali Convention Centre and Radisson Blu",
    service: { href: "/business-registration", label: "Company registration in Rwanda" },
    body: `
It is usually one of the first questions a UK board asks once it has approved an East African expansion: should we set up a separate Rwandan company, or simply register a branch of the UK entity? Both are possible in Rwanda and both are registered with the Rwanda Development Board. The right answer depends on how much risk you want to keep in the UK, who your clients will be, how tax works for your group, and how long you intend to stay.

## The difference in one paragraph

A subsidiary is a Rwandan private limited company owned by your UK company. It is a legal person in its own right, so its debts, contracts and employment obligations belong to it, not to the parent. A branch is not a separate entity at all. It is your UK company carrying on business in Rwanda, registered so that Rwandan authorities know it is there. Everything the branch does, the UK company does.

| | Subsidiary | Branch |
| --- | --- | --- |
| Legal status | Separate Rwandan company | Part of the UK company |
| Liability | Stays with the subsidiary | Falls on the UK parent |
| How clients see it | A local company | A foreign company |
| Access to incentives | Full, subject to conditions | More limited in practice |
| Leaving Rwanda | Sell the shares or liquidate | Deregister the branch |

## When a subsidiary is the better choice

For most UK businesses planning to trade in Rwanda for more than a year, a subsidiary is the right structure, and the reasons are practical rather than theoretical.

Rwandan clients, and particularly public bodies and larger corporates, often prefer or require a local contracting entity. A subsidiary also ring-fences risk: if a supplier dispute or an employment claim arises in Kigali, it is dealt with by the Rwandan company rather than landing on the UK balance sheet. If you plan to apply for an investment certificate, the incentive regime is designed around Rwandan companies. And if you might one day bring in a local partner, raise investment in Rwanda or sell the business, shares in a subsidiary are simple to transfer, whereas a branch cannot be sold on its own.

Finally, a subsidiary lets you appoint a local managing director with real authority to sign contracts and run the business, which matters when the UK team is two thousand miles away.

## When a branch can work

A branch has its place. It suits a time-limited project, such as an engineering contract or a consulting assignment with a defined end date, where setting up and later liquidating a company would be disproportionate. It can also suit a professional services firm whose clients specifically expect to contract with the UK entity because of its regulatory status or insurance.

The caveat is that a branch is hard to undo. If the project grows into a permanent presence, converting the branch into a subsidiary is effectively a fresh registration followed by a transfer of contracts, assets and staff. In our experience it is almost always cheaper to begin with the structure you expect to end with.

## How the two are taxed, in outline

In Rwanda, a branch's profits are taxed broadly as a company's would be, at the standard corporate income tax rate of 28%, under Rwandan rules on what is deductible. A subsidiary is taxed on its own profits in the same way, and withholding tax, generally at 15%, applies when it pays dividends to the UK parent.

The UK side differs between the two. Branch profits may fall within the UK's branch exemption if the company elects for it, while dividends received by a UK company from a foreign subsidiary are often exempt under the dividend exemption rules. Which route produces the better overall result depends on the group's profile, and for large groups the global minimum tax adds another layer. This is a decision to make with your UK tax adviser before registration, not after.

## What the UK parent must provide

For either structure, the Rwanda Development Board will ask for the UK company's certificate of incorporation and articles, a board resolution approving the Rwandan entity or branch and naming its representative, details of the persons with significant control, and passport copies of directors and the local representative. UK corporate documents generally need to be notarised and apostilled. We send clients an exact list before they instruct a notary, which avoids paying twice for the same certification.

Once registered, both structures follow the same path: a tax identification number issued at registration, a corporate bank account, registration with the Rwanda Social Security Board before hiring, VAT registration where required and any sector licences.

## A worked example

Imagine a Manchester engineering consultancy that has won a two-year contract to supervise construction of a building in Kigali, with no plans beyond it. A branch may be perfectly sensible: the client knows the UK firm, the contract has an end date, and closing a branch afterwards is straightforward.

Now imagine a London fintech company that wants to build a regional operations centre in Kigali and eventually serve customers across East Africa. It will hire local staff, may need a licence from the National Bank of Rwanda, and hopes to raise local investment in a few years. A subsidiary is the only realistic option.

## Our recommendation

If you are serious about Rwanda, open a subsidiary from day one. If you are genuinely unsure, talk to us before choosing a branch. In a [free consultation](/contact) we will look at your contracts, timeline and group structure and give you a clear recommendation. For the bigger picture, read [investing in Rwanda from London](/uk/investing-in-rwanda-from-london), and when you are ready, our [business registration service](/business-registration) can take it from there.
`,
    faqs: [
      { q: "Can a UK company register a branch in Rwanda?", a: "Yes. A foreign company can register a branch with the Rwanda Development Board using its notarised and apostilled constitutional documents and a board resolution." },
      { q: "Is a branch or subsidiary better for tax in Rwanda?", a: "Both are taxed on Rwandan profits at the standard 28% corporate rate. A subsidiary also pays withholding tax on dividends. The overall effect depends on UK rules, so model both with your UK adviser." },
      { q: "Do UK documents need an apostille for Rwanda?", a: "Corporate documents from the UK usually need to be notarised and apostilled for registration in Rwanda. Passport scans of individuals generally do not." },
      { q: "Can a branch later become a subsidiary?", a: "Not directly. Moving from a branch to a subsidiary generally means registering a new company and transferring contracts, assets and staff to it, which is why it is usually better to choose the final structure from the start." },
    ],
  },
  {
    market: "uk",
    slug: "rwanda-uk-trade-dcts-guide",
    lang: "en-GB",
    title: "Trading Between Rwanda and the UK: A Practical Guide to DCTS",
    metaTitle: "Rwanda–UK Trade: Duty-Free Access Under DCTS",
    description:
      "How Rwandan exports reach the UK duty-free under the Developing Countries Trading Scheme, which products benefit, and how UK businesses can use it.",
    keywords: ["Rwanda UK trade", "DCTS Rwanda", "import from Rwanda to UK", "Rwanda coffee export UK", "duty free UK least developed countries"],
    category: "Trade",
    date: D,
    readMinutes: 7,
    image: "/assets/images/manu.jpg",
    imageAlt: "Manufacturing workshop in the Kigali Special Economic Zone",
    service: { href: "/consulting", label: "Export strategy & market research" },
    body: `
When the UK left the European Union it needed its own trade preferences for developing countries, and in June 2023 it launched the Developing Countries Trading Scheme, usually shortened to DCTS. For Rwanda, and for any British business that buys from Rwanda or wants to produce there, it is one of the most useful and least discussed parts of the commercial relationship.

This guide explains what DCTS gives Rwanda, the rules that decide whether a product actually benefits, and how UK importers and investors are using it.

## What DCTS gives Rwanda

DCTS sorts eligible countries into tiers. Rwanda is classed as a least developed country, which places it in the most generous tier, known as Comprehensive Preferences. Goods originating in countries in that tier can enter the UK free of import duty and without quotas. The only exclusion is arms and ammunition.

In plain terms, Rwandan coffee, tea, flowers, fresh produce, processed foods, textiles and manufactured goods can all be sold into the UK without customs duty, provided they meet the rules of origin. For a UK importer, that can mean a real price advantage compared with suppliers from countries that pay standard UK tariffs.

## Rules of origin: the part that decides everything

Duty-free access only applies to goods that genuinely originate in Rwanda under DCTS rules, and this is where many first-time importers trip up.

Products that are wholly obtained in Rwanda, such as coffee or tea grown and processed there, usually qualify without difficulty. Manufactured goods are different. Each product has a specific rule that sets out how much processing must happen in Rwanda, or what share of non-originating materials is allowed. A garment sewn in Rwanda from imported fabric, or a packaged food made with imported ingredients, may or may not qualify depending on the exact rule for its commodity code.

DCTS also allows cumulation in some circumstances, which means that materials from certain other countries can count towards origin. That can be helpful for products that use inputs from neighbouring countries in the region. The exporter makes a statement on origin, and both sides should keep evidence that the rules have been met in case HMRC asks.

The practical advice is simple: check the origin rule for your exact commodity code before you design a supply chain, not after the first container has shipped.

## What Rwanda sells, and where the UK fits in

Rwanda's best-known exports are specialty coffee, tea and minerals, with horticulture and processed foods growing quickly. The UK is a natural market for premium coffee and tea in particular. British roasters and tea companies value traceable, quality-focused supply, and Rwanda's cooperatives and washing stations have built strong reputations with specialty buyers. Ethically sourced, traceable products also sit comfortably with the sustainability reporting that many UK retailers now require of their suppliers.

## Three ways UK businesses are using DCTS

The first, and simplest, is sourcing. UK importers and retailers buy coffee, tea and specialty foods directly from Rwandan exporters and cooperatives and bring them in duty-free.

The second is processing in Rwanda. A UK food or drink brand can roast, blend, pack or process close to the farm and export finished products to the UK without duty, while selling the same products into East Africa. Adding value in Rwanda is also something the Rwandan government actively encourages.

The third is investment in production. Companies set up processing or light manufacturing in Rwanda, often in the Kigali Special Economic Zone, and use DCTS for the UK market alongside regional sales through the East African Community and the African Continental Free Trade Area. Larger projects of this kind can qualify for an investment certificate, which may bring customs relief on equipment and a preferential corporate tax rate.

## Logistics: plan for a landlocked country

Rwanda has no coastline. Containers travel by road to the ports of Mombasa in Kenya or Dar es Salaam in Tanzania and then by sea to Europe, which adds time and cost. High-value or perishable goods, such as specialty coffee samples, cut flowers and fresh produce, often fly out of Kigali instead. Whichever route you use, build realistic transit times into your contracts and your pricing, and allow for the occasional delay at the border or in port.

## Getting started

If you only want to buy, the first step is finding reliable suppliers and confirming that your products meet the origin rules. If you want to produce or process in Rwanda, you will also need a Rwandan company, the right licences and, for larger projects, an investment certificate. Read our guide to [opening a subsidiary or branch](/uk/uk-company-subsidiary-or-branch-in-rwanda) for the corporate side.

Our [consulting team](/consulting) carries out market research, supplier identification and feasibility studies, and our [investment team](/investment) handles company set-up and incentives. Book a [free consultation](/contact) and tell us what you want to buy or make.
`,
    faqs: [
      { q: "Can Rwandan goods enter the UK duty-free?", a: "Yes. As a least developed country, Rwanda qualifies for the Comprehensive Preferences tier of the UK's Developing Countries Trading Scheme, which gives duty-free, quota-free access for all goods except arms and ammunition, subject to rules of origin." },
      { q: "What is DCTS?", a: "The Developing Countries Trading Scheme is the UK's trade preference scheme for developing countries. It replaced the UK's post-Brexit version of the generalised scheme of preferences in June 2023." },
      { q: "Do I need proof of origin to import from Rwanda?", a: "Importers must be able to show that goods originate in Rwanda under DCTS rules, typically through an origin statement from the exporter supported by evidence. Check current HMRC guidance for your product." },
    ],
  },
  {
    market: "uk",
    slug: "kigali-business-travel-guide-from-london",
    lang: "en-GB",
    title: "Kigali Business Travel from London: The Executive's Guide",
    metaTitle: "Kigali Business Travel from London: Executive Guide",
    description:
      "Flights, visas, hotels, transfers, meetings and downtime: everything a London executive needs for an efficient business trip to Kigali.",
    keywords: ["Kigali business travel", "London to Kigali flights", "Rwanda visa UK citizens", "best hotels Kigali business", "executive travel Rwanda"],
    category: "Executive travel",
    date: D,
    readMinutes: 7,
    image: "/assets/images/grand.jpg",
    imageAlt: "Business hotel in Kigali at sunset",
    service: { href: "/executive-travel", label: "Executive travel & VIP concierge" },
    body: `
Most first visits to Kigali are scoping trips. You meet the Rwanda Development Board, see a couple of offices, talk to a bank, perhaps interview a country manager, and fly home with enough to decide whether to commit. Done well, three or four days is enough. Done badly, the same trip can leave you with jet-lagged meetings, long waits for taxis and very little to show your board.

This guide covers what we tell every London executive before their first trip.

## Getting there

RwandAir operates direct flights between London Heathrow and Kigali International Airport. The overnight flight takes around eight and a half to nine hours, which means you can leave London in the evening and be in a Kigali meeting the following afternoon. If the direct flight does not suit your dates, there are good one-stop options through Doha, Istanbul, Addis Ababa, Amsterdam or Brussels.

Because Kigali is only one or two hours ahead of London, depending on the season, jet lag is barely a factor. Kigali International Airport is about twenty to thirty minutes from the city centre. A new, larger airport is being built at Bugesera, south of the capital, but until it opens all international flights use the current airport.

## Visas

British citizens can generally obtain a visa on arrival or apply online in advance through the government's Irembo portal. Rules and fees change from time to time, so check the Directorate General of Immigration and Emigration shortly before you travel. A visitor visa covers business meetings; taking up employment in Rwanda requires a work permit.

One practical note: plastic bags are banned in Rwanda, and that includes bags in your luggage. Duty-free shopping bags are usually confiscated at the airport, so pack accordingly.

## Where to stay

Most business travellers stay near the Kigali Convention Centre or in the city centre. The Radisson Blu Hotel and Convention Centre sits right next to the conference venue, which makes it the obvious choice during major events. The Kigali Marriott is central, has good meeting rooms and attracts a strong business crowd. The Kigali Serena is one of the city's longest-established addresses and remains popular with visiting executives. If your stay is longer than a week, serviced apartments in Kimihurura or Kiyovu are often better value and more comfortable.

Kigali hosts a steady stream of international conferences, and during the larger ones the best rooms disappear months in advance. Book early if your dates coincide with a major event.

## Getting around

Kigali is compact but hilly, and most journeys between meetings take fifteen to thirty minutes by car. For a business trip we recommend a dedicated driver for the duration of your stay. It is not a luxury: a driver who knows where the RDB, the banks and the main office buildings are, and who waits outside while you are in a meeting, can add an extra meeting to every day. Ride-hailing apps work in Kigali, and you will see motorcycle taxis everywhere, but neither is ideal when you are moving between formal meetings in a suit.

## Making your meetings count

Book meetings with the Rwanda Development Board's investor team well in advance; they are responsive but busy. Arrive on time, because punctuality is expected and noticed. Dress formally for government meetings and smartly elsewhere. Business cards are still exchanged, so bring plenty.

Rwandan business culture is courteous and values relationships. Take time for introductions before getting to the point, and do not be surprised if a first meeting is mostly about getting to know each other. After each meeting, follow up in writing the same day. Many decisions are confirmed by email or WhatsApp, and a prompt, clear summary of what was agreed is appreciated.

## Money and connectivity

Cards are accepted in hotels and larger restaurants, but it is worth carrying some Rwandan francs for smaller purchases and tips. A local SIM card from MTN or Airtel, available at the airport, gives you fast 4G data and access to mobile money, which is how much of the economy pays.

## If you can, stay an extra day

Rwanda rewards those who extend a business trip by a day or two. The Kigali Genocide Memorial is an essential visit for understanding the country you are about to do business in, and it can be fitted into a half day. Gorilla trekking in Volcanoes National Park is about two and a half hours from Kigali; permits are limited and need to be booked well ahead. Lake Kivu, a few hours west, is a relaxing place to spend a weekend before an evening flight home.

## A sample three-day scoping trip

On the first day, arrive in the afternoon, check in and have a briefing dinner with your local advisers to agree the plan. On the second day, meet the Rwanda Development Board in the morning, see a bank and two potential office spaces in the afternoon, and interview candidates for a country manager role at the end of the day. On the third day, meet prospective clients or partners in the morning, visit the Kigali Genocide Memorial in the afternoon, and take the evening flight home.

## Plan it with us

Our [executive travel team](/executive-travel) builds itineraries, books hotels and drivers, schedules meetings and arranges permits for trips to the national parks. If your visit is the first step towards setting up, read [investing in Rwanda from London](/uk/investing-in-rwanda-from-london), or [book a free consultation](/contact) to plan your trip.
`,
    faqs: [
      { q: "How long is the flight from London to Kigali?", a: "RwandAir's direct flight from London Heathrow to Kigali takes roughly eight and a half to nine hours. Connecting itineraries via Doha, Istanbul, Amsterdam or Brussels take longer." },
      { q: "Do British citizens need a visa for Rwanda?", a: "British citizens can generally obtain a visa on arrival or apply online. Rules and fees change, so always check DGIE or Irembo before travelling." },
      { q: "Which hotels in Kigali are best for business?", a: "The Radisson Blu next to the Kigali Convention Centre, the Kigali Marriott and the Kigali Serena are popular with business travellers. Serviced apartments suit longer stays." },
    ],
  },
  {
    market: "uk",
    slug: "hiring-in-rwanda-guide-for-uk-employers",
    lang: "en-GB",
    title: "Hiring in Rwanda: A Guide for UK Employers",
    metaTitle: "Hiring in Rwanda: A Guide for UK Employers",
    description:
      "How UK companies recruit, employ and pay staff in Rwanda: contracts, social security, payroll, work permits for UK staff and building a strong local team.",
    keywords: ["hiring in Rwanda", "employ staff in Rwanda", "Rwanda labour law", "Rwanda payroll", "work permit Rwanda UK"],
    category: "HR & recruitment",
    date: D,
    readMinutes: 7,
    image: "/assets/photos/kigali-cbd-2.jpg",
    imageAlt: "Office towers in central Kigali",
    service: { href: "/hr-recruitment", label: "Recruitment & HR support in Rwanda" },
    body: `
Rwanda's workforce is young, increasingly bilingual in English and French, and well educated in exactly the areas UK companies tend to need: finance, technology, customer service, project management and engineering. Salaries are lower than in London, and staff turnover in well-run companies is modest. None of that makes hiring automatic. The companies that build strong teams in Kigali are the ones that understand the local rules and the local market before they post the first advert.

## Employing directly, or through a partner while you set up

There are two ways to employ people in Rwanda. The first is to employ them directly through your own Rwandan company, which means registering that company as an employer with the Rwanda Social Security Board and running a local payroll. This is the long-term model for any company that intends to stay.

The second is to work through a local partner who recruits and pays staff on your behalf while your own entity is being established. It can be a useful bridge for the first few months, particularly when a client contract starts before your company is fully operational. The arrangement should be properly documented, and staff should transfer to your own company once it is ready.

If you have not yet set up a Rwandan entity, read [subsidiary or branch?](/uk/uk-company-subsidiary-or-branch-in-rwanda) before you begin recruiting.

## The employment law basics

Employment in Rwanda is governed by the labour law of 2018 and its implementing regulations. Employment contracts should be in writing and should set out the role, pay, working hours and place of work. Probation periods are allowed but must be stated in the contract. Employees are entitled to annual leave, maternity leave and public holidays as set out in law. Ending an employment relationship requires a fair process, with notice and, in some circumstances, severance pay.

For UK managers, the most important adjustment is that informal arrangements carry risk. A well-drafted contract and a clear staff handbook prevent most disputes, and labour inspections do take place. Our [HR support team](/hr-recruitment#hr-admin-support) prepares both in line with Rwandan law.

## Payroll and social security

Each month, employers withhold pay-as-you-earn income tax from salaries and pay contributions to the Rwanda Social Security Board covering pension, occupational hazards and maternity leave, alongside contributions to community health insurance. Rates and tax bands are set by law and are revised from time to time, so payroll software or a payroll provider must be kept current. Filings and payments are monthly, and late payment attracts penalties.

Many UK companies outsource payroll in their first year or two in Rwanda. It is rarely expensive, and it removes one of the most common sources of compliance problems while the local team is small.

## Where good candidates come from

Graduate talent comes from the University of Rwanda, Carnegie Mellon University Africa, the African Leadership University and other institutions, and the best graduates are in demand. Experienced professionals often come from international organisations, NGOs, banks and the growing number of regional companies with offices in Kigali, as well as from a returning diaspora who have worked in Europe or North America.

For senior hires, a specialist recruiter or a well-connected local adviser is worth the fee. Candidates at that level are often not actively looking, and much of the market works through personal networks.

## Setting pay sensibly

Salaries in Kigali are well below London levels, but they are rising for senior and technical roles, and good candidates compare offers. Benchmark against the local market rather than converting a UK salary, and be clear about the full package. Private health insurance is expected for professional roles, and benefits such as training budgets, transport allowances and performance bonuses help you compete. Paying slightly above the market for key roles usually costs less than replacing someone after a year.

## Bringing UK staff to Rwanda

Managers and specialists you send from the UK will need a residence permit and a work permit from the Directorate General of Immigration and Emigration, applied for through the Irembo portal. The usual documents are a passport, a criminal record certificate from the UK, degree certificates and an employment contract. Companies holding an investment certificate can generally bring in a limited number of foreign key staff on easier terms. Start the process early, because a UK manager arriving before the permit is issued can find their first weeks constrained.

## Building a team that stays

Hire a capable local manager early. Relationships matter in Kigali, with clients, suppliers and officials, and a respected local leader opens doors that a visiting UK executive cannot. Invest visibly in onboarding and training; staff loyalty is strong when people can see how they will develop. Communicate clearly and courteously, and be aware that hierarchy is respected, so junior staff may not volunteer problems unless they are asked directly. And keep your HR paperwork in order from the first day.

## How we help

We run end-to-end [recruitment](/hr-recruitment), payroll, HR policies and work permits for foreign companies in Rwanda. Tell us the roles you need to fill in a [free consultation](/contact), and we will give you a realistic view of the market, salaries and timelines.
`,
    faqs: [
      { q: "Can a UK company hire employees in Rwanda without a local entity?", a: "Directly employing staff normally requires a Rwandan entity registered with the Rwanda Social Security Board. While setting up, a local partner can recruit and run payroll on your behalf." },
      { q: "What payroll taxes apply in Rwanda?", a: "Employers withhold PAYE income tax and contribute to the Rwanda Social Security Board for pension, occupational hazards and maternity leave, plus community health contributions. Rates are set by law and filed monthly." },
      { q: "How long does a Rwandan work permit take?", a: "Work and residence permits are processed by DGIE through the Irembo portal. With complete documents, processing commonly takes a few weeks, but timelines vary." },
    ],
  },
];
