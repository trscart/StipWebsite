let languages = {
    "en-EN": {
        
        // generic
        "nav-item1": "HOME",
        "nav-item2": "PLATFORM",
        "nav-item3": "BLOG",
        "nav-item4": "CONTACTS",
        "heroTitle": "The platform that automates all Social & Email Customer Care activities thanks to AI",
        "demoBtn": "DEMO REQUEST",
        "contactBtn": "CONTACT US",
        "footerHome": "HOME",
        "footerHomeWhat": "What we do",
        "footerHomeBenefit": "Discover the benefits",
        "footerHomeAi": "Artificial intelligence",
        "footerPlatform": "PLATFORM",
        "footerPlatformHow": "How It works",
        "footerPlatformIntegration": "Integration",
        "footerPlatformCustomer": "Customer experience",
        "footerBlog": "BLOG",
        "footerBlogMore": "Check out all the articles",

        // home page
        "heroSubtitle": "By automating all Social and Email Customer Care processes through its Artificial Intelligence, Stip reduces Customer Care costs, decreases ticket management time and enables Customer Service operators to boost their performances by focusing on the one thing that really matters: making customers happy.",
        "whatTitle": "What we do",
        "whatSubtitle": "Thanks to its three layer of AI, Stip automates and streamlines all Customer Care actions, processes and activities.",
        "whatCaringTitle": "Caring/No Caring + Hidden",
        "whatCaringTxt": "Stip automatically discriminates if all user-generated contents related with your brand - both inside and outside your official channels - are to be managed or not. Once a content is labeled as ‘caring’, the platform interacts with the customer, activating a real-time conversation, tailored on anyone’s specific needs",
        "whatTicketTitle": "Ticket Creation",
        "whatTicketTxt": "Stip asks the customer all information and data needed for optimal management of the request. In the event of complex issues, that call for the intervention of a human operator, the platform automatically creates a ticket and collects all relevant information, which will be visible in a single interface",
        "whatRedirectTitle": "Redirect",
        "whatRedirectTxt": "Once created and classified the ticket in a fully automatic way, Stip redirects it to the most accurate agent, allowing a more rapid, flexible and efficient management of the request. Tickets addressing occurs complying with internal workflows and each company policies",
        "benefitTitle": "Our benefits",
        "benefitSubtitle": "Here are some of the advantages our clients have experienced:",
        "benefitTimeTitle": "Reduction",
        "benefitTimeTxt": "Stip reduces by 80% management time and notifications processing",
        "benefitCostTitle": "Costs Cutting",
        "benefitCostTxt": "Stip provides savings of more than 67% compared to traditional Customer Care",
        "benefitPerformanceTitle": "Performance Growth",
        "benefitPerformanceTxt": "Stip leads to increase your agents job performances by 167%",
        "benefitRevenueTitle": "Increase in Revenue",
        "benefitRevenueTxt": "Social Customer Care enhances customers’ retention by 27% thanks to Stip",
        "optimizeTitle": "Stip optimises the whole Social & Email Customer Care process for medium to large businesses by using AI",
        "optimizeSetupTitle": "Easy Setup",
        "optimizeSetupTxt": "Stip’s proprietary layer AI makes it possible to have your own personalized AI in no time",
        "optimizeSocialTitle": "Social Listening",
        "optimizeSocialTxt": "Stip’s probes are constantly scanning all channels and enable you to track down all UGC about your company, both inside and outside your official pages",
        "optimizeAiTitle": "Artificial Intelligence",
        "optimizeAiTxt": "Stip operates, thanks to its three layer AI, automatically, real-time and without any human interaction",
        "optimizeMetricTitle": "Metric Measurement",
        "optimizeMetricTxt": "With Stip you get a smart management platform, a punctual KPI set and unique statistics. The platform can be integrated with any company’s CRM!",
        "learnMoreTitle": "Contact us!",
        "learnMoreSubtitle": "Stip team is at your service for any need or request of information. Besides, Customer Care is kind of what we do best!",

        // platform page
        "howTitle": "How It works",
        "howHoldTitle": "Hold down your fort",
        "howHoldTxt": "Stip monitors and identifies all user generated contents related with your brand both inside and outside company’s official platforms and channels. The platform automatically defines which content has to be managed and which ones can be ignored.",
        "howTicketTitle": " A ticket as if by magic",
        "howTicketTxt": "Once Stip has detected that a certain request needs to be handled, the bot starts interacting directly with the customer, asking all needed information in order to best solve that peculiar case. After getting all relevant piece of information, the platform creates a ticket ready to be managed by an operator.",
        "howOperatorTitle": "You are my man!",
        "howOperatorTxt": "Stip’s third AI layer makes it possible to redirect the automatically-generated ticket to the most accurate operator with all the information the agent may need. All the process takes place in compliance with each company’s internal workflow and policies.",
        "satisfyTitle": "Stip meets the needs of any company, being capable to integrate with any CRM and offering a wide opportunity of customization",
        "satisfyCrmTitle": "CRM integration",
        "satisfyCrmTxt": "Stip can be easily integrated with any CRM, avoiding disrupting internal routine and maintaining the advantages of Customer Care automation",
        "satisfyStatisticsTitle": "Statistics and Metrics",
        "satisfyStatisticsTxt": "The platform tracks, monitors and analyses all activities in order to offer companies all relevant metrics and statistics to improve and optimise their Social and Email Customer Care processes",
        "satisfyPersonalisationTitle": "Personalisation",
        "satisfyPersonalisationTxt": "Allows wide customization options; from the AI to the chatbot, passing through the choice of the destination of automatic tickets until the tone of voice and internal management",
        "accurateTitle": "Be quick, clear and efficient and build relationship with your customers",
        "accurateSubtitle": "By automating all Customer Care activities on Social Networks and Email channels, Stip allows agents to focus on the only thing that matters: to develop meaningful relationships, making your customers happy",
        "accuratePerformanceTitle": "Improving performances",
        "accuratePerformanceTxt": "Your agents performances will increase by 167%. Stip automatically manages easy requests, discerns between contents, creates tickets and redirects them to the most accurate operator. In this way it makes it possible to maximise operating times and make work more efficient",
        "accuratePersonalisationTitle": "Build relationships",
        "accuratePersonalisationTxt": "To answer the customers is an agent’s job! Your customers expect to have a proper conversation with your brand by interacting with someone who gets their emotions and requests with sympathy. We all know that most chatbots cannot achieve that. This is why Stip allows your agents to manage complex requests and to interact directly with your customers, building a long-lasting relationship",
        "accurateSatisfactionTitle": "Customer Satisfaction",
        "accurateSatisfactionTxt": "Customer satisfaction becomes reality. Stip has full care of your clients and real-time updates them about their request, just like it was a package from Amazon! That allows a substantial reduction of solicitous and of the perceived waiting, that enhance their experience with your brand"
    }
}


$(document).ready(function () {
    let language = navigator.language; // get current language

    // change text language
    if (language != "it-IT") {
        $(".lang").each(function () {
            $(this).text(languages["en-EN"][$(this).attr("key")]);
        });
    }
})
