export interface PlanData {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface FaqData {
  question: string;
  answer: string;
}

export const PUBLIC_PLANS: PlanData[] = [
  {
    name: "Starter",
    price: "19",
    period: "/mois",
    description: "Pour démarrer rapidement avec une seule équipe.",
    features: [
      "1 équipe",
      "Résultats automatiques",
      "3 templates",
      "Instagram + Facebook",
      "Support email",
    ],
    cta: "Commencer l'essai",
  },
  {
    name: "Pro",
    price: "39",
    period: "/mois",
    description: "Le plan le plus choisi par les clubs amateurs.",
    features: [
      "Jusqu'à 5 équipes",
      "Templates illimités",
      "Génération manuelle",
      "Planification avancée",
      "Support prioritaire",
    ],
    popular: true,
    cta: "Commencer l'essai",
  },
  {
    name: "Club",
    price: "79",
    period: "/mois",
    description: "Pour les structures multi-sections et multi-utilisateurs.",
    features: [
      "Équipes illimitées",
      "5 utilisateurs",
      "Statistiques avancées",
      "Accès API",
      "Onboarding dédié",
    ],
    cta: "Nous contacter",
  },
];

export const PUBLIC_FAQS: FaqData[] = [
  {
    question: "Faut-il des compétences techniques ?",
    answer: "Non. AutoMaComm a été conçu pour être utilisé par les bénévoles et dirigeants sans formation technique.",
  },
  {
    question: "Puis-je annuler à tout moment ?",
    answer: "Oui, l'abonnement est sans engagement et peut être résilié depuis les paramètres du compte.",
  },
  {
    question: "Quels réseaux sont supportés ?",
    answer: "Instagram et Facebook sont disponibles aujourd'hui. D'autres réseaux arriveront ensuite.",
  },
  {
    question: "Y a-t-il un essai gratuit ?",
    answer: "Oui, un essai de 14 jours est proposé sur tous les plans sans carte bancaire.",
  },
];

export const CONTACT_INFOS = [
  { label: "Email", value: "contact@automacomm.fr" },
  { label: "Téléphone", value: "+33 1 23 45 67 89" },
  { label: "Disponibilité", value: "Lun-Ven, 9h-18h" },
  { label: "Localisation", value: "Paris, France" },
] as const;
