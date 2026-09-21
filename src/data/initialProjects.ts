import { Project } from '../types/project';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1-air-quality-automation',
    slug: 'ai-smart-air-quality-automation',
    title: 'AI-Based Smart Air Quality Automation System',

    short_description:
      'Intelligent environmental monitoring and automated control system integrating embedded sensors, real-time telemetry, and IoT-based actuation.',

    category: 'Embedded & IoT',
    status: 'COMPLETED',

    technologies: [
      'ESP32',
      'MQ-135 Sensor',
      'DHT22',
      'Relay Actuation',
      'IoT / MQTT',
      'Automation Logic'
    ],

    thumbnail_url: './assets/projects/air-quality-automation.svg',

    github_url: 'https://github.com/samkiller07/ai-safety-monitoring-system',
    demo_url: null,

    problem:
      'Environmental conditions in sensitive spaces fluctuate continuously. Manual inspection and static timers fail to respond dynamically to hazardous pollutant spikes, risking equipment and occupant safety.',

    engineering_approach:
      'Engineered an autonomous closed-loop embedded system combining analog gas telemetry (MQ-135) and digital thermal feedback (DHT-22). Processed sensor inputs on an ESP32 microcontroller with calibrated threshold triggers to actuate ventilation relays and stream live telemetry to an IoT cloud dashboard.',

    what_i_built:
      'Fabricated and programmed a complete hardware prototype including sensor conditioning circuitry, dual-core ESP32 firmware in C++, relay safety interlocks, and an IoT telemetry dashboard.',

    system_architecture:
      'Environmental Sensors (MQ-135 / DHT-22) -> ESP32 12-Bit ADC Conditioning -> Threshold Classification Logic -> Solid-State Relay Actuator Stage -> MQTT / Web Telemetry Uplink',

    workflow:
      'Continuous 10Hz sampling of ambient PPM, temperature, and humidity. If air quality degrades beyond 450 PPM or temperature exceeds safe limits, the ESP32 instantaneously triggers active ventilation, sounds safety warnings, and broadcasts real-time telemetry.',

    results_outcome:
      'Successfully built, validated in physical hardware testing, and led the engineering team to win First Prize at AutoBot Hackathon 2025.',

    featured: true,
    sort_order: 1,

    media: [
      {
        type: 'diagram',
        url: './assets/projects/air-quality-automation.svg',
        caption: 'Closed-loop hardware architecture, ESP32 sensor interfacing, and relay actuation workflow.',
        sort_order: 1
      }
    ]
  },

  {
    id: 'p2-internship-recommendation',
    slug: 'internship-recommendation-system',
    title: 'Internship Recommendation System',

    short_description:
      'Algorithmic recommendation platform matching students with tailored internships using a weighted multi-attribute selection model.',

    category: 'Software & AI',
    status: 'COMPLETED',

    technologies: [
      'Python',
      'Flask',
      'Algorithmic Matching',
      'REST API',
      'JSON Heuristics'
    ],

    thumbnail_url: './assets/projects/internship-recommendation.svg',

    github_url: 'https://github.com/samkiller07/internship-recommendation-system',
    demo_url: null,

    problem:
      'Students across diverse education tiers struggle to filter through thousands of mismatched internship postings lacking personalized relevance to their specific skillset, location constraints, and academic tier.',

    engineering_approach:
      'Architected a multi-attribute weighted scoring algorithm in Python. The engine balances candidate competencies against opportunity parameters, producing ranked recommendation scores with sub-15ms response latency.',

    what_i_built:
      'Engineered a complete Flask web application and REST API supporting candidate onboarding (10th, 12th, UG, PG), multi-criteria preference matching, and deterministic opportunity ranking.',

    system_architecture:
      'Student Profile Input -> Multi-Vector Heuristic Engine -> Weighted Scoring Matrix (Skills 30% + Sector 30% + Education 20% + Location 20%) -> Rank-Ordered Opportunities Response',

    workflow:
      'The applicant submits skills, target sector, qualification, and location preferences. The Flask engine parses candidate vectors, computes weighted relevance matrices, and returns top-matching internship listings.',

    results_outcome:
      'Implemented and verified weighted selection model delivering highly accurate recommendations across diverse student profiles with instant query execution.',

    featured: true,
    sort_order: 2,

    media: [
      {
        type: 'diagram',
        url: './assets/projects/internship-recommendation.svg',
        caption: 'Multi-attribute algorithmic weighting architecture and Flask application pipeline.',
        sort_order: 1
      }
    ]
  },

  {
    id: 'p3-hypermesh-automation',
    slug: 'hypermesh-tcl-automation-studio',
    title: 'HyperMesh Tcl Automation Studio',

    short_description:
      'Engineering automation suite using Tcl/Tk scripting to accelerate repetitive Altair HyperMesh preprocessing and CAE meshing workflows.',

    category: 'Engineering Software',
    status: 'COMPLETED',

    technologies: [
      'Tcl/Tk',
      'Altair HyperMesh',
      'FEA Preprocessing',
      'CAD Cleanup',
      'Meshing Automation',
      'Batch Scripting'
    ],

    thumbnail_url: './assets/projects/hypermesh-tcl-automation.svg',

    github_url: 'https://github.com/samkiller07/hypermesh_automated_tcl_script',
    demo_url:
      'https://samkiller07.github.io/hypermesh_automated_tcl_script/',

    problem:
      'CAE analysts spend over 70% of engineering time performing manual, repetitive CAD cleanup, midsurface extraction, bolt washer splitting, and element quality checking before solver execution.',

    engineering_approach:
      'Developed a modular Tcl/Tk macro and batch automation framework for Altair HyperMesh that automates CAD defeaturing, 2D/3D quad meshing, quality criteria validation, and 1D/2D connector creation.',

    what_i_built:
      'Created a comprehensive Tcl automation studio covering geometry cleanup, parametric washer generation, auto-remeshing failed elements, material assignment, and solver deck export (.fem, .bdf, .inp).',

    system_architecture:
      'CAD Geometry Input -> Automated Defeaturing & Midsurface -> Batch 2D Quad Mesh Generation -> Element Quality Criteria Auto-Check -> Connectors & Properties -> OptiStruct / Nastran Export',

    workflow:
      'The engineer selects the automation pipeline or batch script. Tcl procedures execute the sequence in HyperMesh, auto-correcting element warpage and aspect ratio violations, reducing manual modeling time from 45 min to under 2 min.',

    results_outcome:
      'Achieved >95% reduction in repetitive CAE preprocessing setup time while ensuring 100% compliance with strict automotive/aerospace element quality criteria.',

    featured: true,
    sort_order: 3,

    media: [
      {
        type: 'diagram',
        url: './assets/projects/hypermesh-tcl-automation.svg',
        caption: 'HyperMesh Tcl automation pipeline, quality validation matrix, and solver deck generation.',
        sort_order: 1
      }
    ]
  },

  {
    id: 'p4-human-activity-detection',
    slug: 'human-activity-object-detection',
    title: 'Human Activity & Object Detection',

    short_description:
      'Real-time edge computer vision pipeline combining YOLO deep learning detection with OpenCV human activity and posture classification.',

    category: 'Computer Vision & AI',
    status: 'COMPLETED',

    technologies: [
      'Python',
      'OpenCV',
      'YOLO',
      'Computer Vision',
      'Pose Estimation',
      'Edge AI'
    ],

    thumbnail_url: './assets/projects/computer-vision-detection.svg',

    github_url: null,
    demo_url: null,

    problem:
      'Real-time workplace safety and monitoring requires low-latency visual intelligence capable of simultaneously localizing objects and interpreting human operational states without expensive server infrastructure.',

    engineering_approach:
      'Integrated an anchor-free YOLO object detection model with OpenCV keypoint angle tracking. Optimized inference pipeline to process live camera frames with sub-35ms latency on edge hardware.',

    what_i_built:
      'Engineered a complete Python computer vision application capable of multi-class object detection and real-time posture analysis (sitting, standing, active movement) with telemetry overlay.',

    system_architecture:
      '1080p Camera Stream -> OpenCV Frame Normalization -> YOLO Deep Learning Inference -> Non-Maximum Suppression -> Keypoint Angle Posture Classifier -> Real-Time HUD Overlay Output',

    workflow:
      'Live frames are acquired and normalized. YOLO generates bounding boxes and class probabilities while keypoint analysis calculates joint angle trigonometry to determine posture states at over 30 FPS.',

    results_outcome:
      'Developed a reliable real-time vision system achieving high confidence scores (0.94+ person, 0.91+ laptop) with robust low-latency frame throughput.',

    featured: true,
    sort_order: 4,

    media: [
      {
        type: 'diagram',
        url: './assets/projects/computer-vision-detection.svg',
        caption: 'Real-time YOLO bounding box detection, keypoint skeleton pose estimation, and HUD telemetry.',
        sort_order: 1
      }
    ]
  },

  {
    id: 'p5-iot-smart-incubator',
    slug: 'iot-smart-incubator-monitoring',
    title: 'IoT Smart Incubator Monitoring & Control System',

    short_description:
      'IoT-enabled thermal regulation and humidity control system utilizing closed-loop PID control and ESP8266 web telemetry.',

    category: 'Embedded & IoT',
    status: 'COMPLETED',

    technologies: [
      'ESP8266',
      'Embedded C',
      'DHT11',
      'PID Control',
      'PWM Relay',
      'WebSockets',
      'IoT Telemetry'
    ],

    thumbnail_url: './assets/projects/iot-incubator-monitoring.svg',

    github_url: 'https://github.com/samkiller07/iot-incubator-monitoring-system',
    demo_url: null,

    problem:
      'Biological incubation chambers require strict thermal stability within ±0.2°C. Simple on-off thermostats cause severe temperature overshoot, risking sensitive specimens.',

    engineering_approach:
      'Implemented a closed-loop PID (Proportional-Integral-Derivative) control algorithm with anti-windup on an ESP8266 microcontroller to modulate heating element PWM and maintain uniform chamber conditions.',

    what_i_built:
      'Fabricated an IoT incubator prototype featuring DHT11 sensing, solid-state relay actuation, PID temperature regulation, and an embedded web server for real-time temperature graphing and setpoint calibration.',

    system_architecture:
      'DHT11 Environmental Sensor -> ESP8266 PID Control Loop -> PWM Power Relay Actuator -> Thermal Chamber -> Embedded Web Server & WebSockets Live Telemetry',

    workflow:
      'The ESP8266 samples chamber temperature every second, computes PID error derivatives against setpoint (37.5°C), modulates heater power via PWM, and broadcasts live telemetry over WiFi to the monitoring dashboard.',

    results_outcome:
      'Maintained stable chamber temperature within ±0.1°C of setpoint with zero overshoot during extended continuous operating tests.',

    featured: false,
    sort_order: 5,

    media: [
      {
        type: 'diagram',
        url: './assets/projects/iot-incubator-monitoring.svg',
        caption: 'Closed-loop PID thermal control cycle, step response curve, and ESP8266 IoT monitoring.',
        sort_order: 1
      }
    ]
  },

  {
    id: 'p6-plc-mini-automation-cell',
    slug: 'plc-mini-automation-cell',
    title: 'PLC Mini Automation Cell',

    short_description:
      'Industrial automation sequence designed in CODESYS using Ladder Logic for conveyor indexing, proximity sensing, actuator dwell timing, and safety interlocks.',

    category: 'Industrial Automation',
    status: 'COMPLETED',

    technologies: [
      'CODESYS V3.5',
      'PLC',
      'Ladder Logic (LD)',
      'IEC 61131-3',
      'Sensors & Actuators',
      'Safety Interlocks',
      'SoftPLC Simulation'
    ],

    thumbnail_url: './assets/projects/plc-mini-automation-cell.svg',

    github_url: null,
    demo_url: null,

    problem:
      'Modern automated manufacturing cells require robust PLC sequencing, safety interlocking, emergency stop fault handling, and automatic recovery routines to prevent industrial jamming.',

    engineering_approach:
      'Designed an IEC 61131-3 compliant Ladder Logic control program in CODESYS. Integrated motor latching, optical proximity part detection, pneumatic cylinder stroke sequencing, TON on-delay timers, and E-Stop interlocks.',

    what_i_built:
      'Engineered and simulated a complete industrial automation cell in CODESYS SoftPLC including conveyor control, cylinder position limits (HOME/END), 2-second dwell timing, fault monitoring, and auto-home initialization.',

    system_architecture:
      'START / E-STOP Inputs -> Conveyor Motor Latch -> Proximity Part Sensor -> Conveyor Halt -> Pneumatic Actuator Forward -> END Limit -> 2.0s TON Timer -> Conveyor Resume -> Actuator Return -> HOME State',

    workflow:
      'Pressing START initiates conveyor indexing. When an incoming workpiece triggers the optical sensor, the conveyor halts and the actuator strokes forward. At the END sensor, a 2.0-second delay executes before the conveyor resumes and the cylinder returns to HOME.',

    results_outcome:
      'Validated 100% of automation sequence rungs, safety interlocks, and fault recovery routines in CODESYS SoftPLC simulation with zero logic deadlocks.',

    featured: false,
    sort_order: 6,

    media: [
      {
        type: 'diagram',
        url: './assets/projects/plc-mini-automation-cell.svg',
        caption: 'CODESYS Ladder Logic rungs, pneumatic cylinder sequencing, and IEC 61131-3 control flow.',
        sort_order: 1
      }
    ]
  }
];