import { Certification } from '../types/system';

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Sensors & Actuators',
    issuer: 'NPTEL',
    description: 'Foundational study of sensor and actuator principles in mechatronic and automation systems.',
    whatILearned: [
      'Built a foundational understanding of sensors and actuators and their role in mechatronic systems.'
    ],
    engineeringRelevance:
      'Provides a foundation for sensing, actuation, and control in robotics and automation systems.',
    skillsCovered: [
      'Sensors',
      'Actuators',
      'Signal Transduction',
      'Mechatronics Fundamentals'
    ]
  },

  {
    id: 'cert-2',
    title: 'Drone Development Internship',
    description: 'Practical engineering internship focused on aerial robotics and hardware integration.',
    whatILearned: [
      'Gained practical exposure to drone development and the integration of hardware components in an aerial robotics system.'
    ],
    engineeringRelevance:
      'Strengthened understanding of system integration within a robotics application.',
    skillsCovered: [
      'Drone Development',
      'Hardware Integration',
      'Embedded Systems',
      'Robotics Applications'
    ]
  },

  {
    id: 'cert-3',
    title: 'Robotics AI Workshop',
    description: 'Technical workshop exploring artificial intelligence concepts applied to automated robotic systems.',
    whatILearned: [
      'Explored the role of artificial intelligence in robotics and intelligent robotic applications.'
    ],
    engineeringRelevance:
      'Connects software intelligence with robotic system development.',
    skillsCovered: [
      'Robotics',
      'Artificial Intelligence',
      'Robotic Applications'
    ]
  },

  {
    id: 'cert-4',
    title: 'Industrial Machine Design',
    description: 'Engineering training covering mechanical design concepts relevant to machinery and automation.',
    whatILearned: [
      'Strengthened understanding of machine design concepts relevant to mechanical and mechatronic systems.'
    ],
    engineeringRelevance:
      'Supports the mechanical design side of robotics and automation systems.',
    skillsCovered: [
      'Industrial Machine Design',
      'Mechanical Design',
      'Engineering Design'
    ]
  }
];
