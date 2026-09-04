import { SkillCategory } from '../types/system';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Robotics & Automation',
    iconName: 'Bot',
    systemCode: 'SYS-RBT-01',
    skills: [
      {
        name: 'Robotics',
        telemetryCode: 'RBT-CORE',
        description: 'Fundamentals of robotics systems and automation applications'
      },
      {
        name: 'Automation',
        telemetryCode: 'AUT-CORE',
        description: 'Automation logic, sequencing, sensors, actuators and control'
      },
      {
        name: 'Sensors & Actuators',
        telemetryCode: 'SNS-ACT',
        description: 'Understanding and application of sensors and actuators in mechatronic systems'
      }
    ]
  },

  {
    category: 'Embedded Systems & IoT',
    iconName: 'CircuitBoard',
    systemCode: 'SYS-EMB-02',
    skills: [
      {
        name: 'Arduino',
        telemetryCode: 'MCU-ARD',
        description: 'Microcontroller programming and embedded system prototyping'
      },
      {
        name: 'ESP32',
        telemetryCode: 'MCU-ESP',
        description: 'Embedded development, sensor interfacing and IoT applications'
      },
      {
        name: 'Embedded Systems',
        telemetryCode: 'EMB-CORE',
        description: 'Hardware-software integration, sensor interfacing and embedded control'
      },
      {
        name: 'IoT',
        telemetryCode: 'IOT-CORE',
        description: 'Connected monitoring systems and IoT-based automation'
      }
    ]
  },

  {
    category: 'Computer Vision & AI',
    iconName: 'Eye',
    systemCode: 'SYS-VIS-03',
    skills: [
      {
        name: 'OpenCV',
        telemetryCode: 'CV-OPENCV',
        description: 'Computer vision and real-time image processing using OpenCV'
      },
      {
        name: 'YOLO',
        telemetryCode: 'AI-YOLO',
        description: 'Deep-learning based object detection for real-time vision applications'
      },
      {
        name: 'Computer Vision',
        telemetryCode: 'CV-CORE',
        description: 'Real-time image analysis, object detection and visual processing'
      },
      {
        name: 'Object Detection',
        telemetryCode: 'CV-OBJ',
        description: 'Real-time object detection using deep-learning vision models'
      },
      {
        name: 'Human Activity Recognition',
        telemetryCode: 'CV-HAR',
        description: 'Human posture and activity analysis using computer vision'
      }
    ]
  },

  {
    category: 'Programming & Software',
    iconName: 'Terminal',
    systemCode: 'SYS-DEV-04',
    skills: [
      {
        name: 'Python',
        telemetryCode: 'DEV-PY',
        description: 'Application development, computer vision, automation and data processing'
      },
      {
        name: 'C',
        telemetryCode: 'DEV-C',
        description: 'Programming for embedded systems and microcontroller applications'
      },
      {
        name: 'C++',
        telemetryCode: 'DEV-CPP',
        description: 'General programming and engineering application development'
      },
      {
        name: 'Java',
        telemetryCode: 'DEV-JAVA',
        description: 'General-purpose programming and application development'
      },
      {
        name: 'Flask',
        telemetryCode: 'DEV-FLASK',
        description: 'Python web application development and backend integration'
      }
    ]
  },

  {
    category: 'Engineering & CAE',
    iconName: 'Box',
    systemCode: 'SYS-CAE-05',
    skills: [
      {
        name: 'Altair HyperMesh',
        telemetryCode: 'CAE-HM',
        description: 'FEA preprocessing, CAD preparation and engineering workflow automation'
      },
      {
        name: 'Tcl/Tk',
        telemetryCode: 'CAE-TCL',
        description: 'Automation scripting for HyperMesh engineering workflows'
      },
      {
        name: 'Industrial Engineering',
        telemetryCode: 'ENG-IND',
        description: 'Application of engineering principles to industrial systems and workflows'
      }
    ]
  },

  {
    category: 'Industrial Automation',
    iconName: 'Cpu',
    systemCode: 'SYS-AUT-06',
    skills: [
      {
        name: 'PLC',
        telemetryCode: 'PLC-CORE',
        description: 'PLC fundamentals, Ladder Logic, timers, counters and control sequencing'
      },
      {
        name: 'Ladder Logic',
        telemetryCode: 'PLC-LAD',
        description: 'Industrial control logic, interlocks and sequential automation'
      },
      {
        name: 'CODESYS',
        telemetryCode: 'PLC-CODE',
        description: 'PLC simulation and Ladder Logic based automation development'
      },
      {
        name: 'Pneumatics',
        telemetryCode: 'PNU-CORE',
        description: 'Pneumatic actuator and control system fundamentals'
      }
    ]
  }
];