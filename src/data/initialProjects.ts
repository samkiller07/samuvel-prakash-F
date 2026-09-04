import { Project } from '../types/project';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1-air-quality-automation',
    slug: 'ai-smart-air-quality-automation',
    title: 'AI-Based Smart Air Quality Automation System',

    short_description:
      'Intelligent environmental monitoring and automated control system integrating embedded sensors, real-time monitoring, and IoT-based automation.',

    category: 'Embedded & IoT',
    status: 'COMPLETED',

    technologies: [
      'Embedded Systems',
      'Sensors',
      'Automation Logic',
      'IoT',
      'Microcontroller'
    ],

    thumbnail_url: null,

    github_url: 'https://github.com/samkiller07/ai-safety-monitoring-system',
    demo_url: null,

    problem:
      'Environmental conditions can change continuously, making manual monitoring and fixed control methods less effective for maintaining a suitable environment.',

    engineering_approach:
      'Developed an embedded monitoring and automation system that collects environmental sensor data, processes the readings, and applies automated control logic based on the monitored conditions.',

    what_i_built:
      'Built an intelligent environmental monitoring system with embedded sensors, real-time monitoring, automated control, and IoT connectivity.',

    system_architecture:
      'Environmental Sensors -> Microcontroller -> Sensor Data Processing -> Automation Logic -> Actuation -> IoT Monitoring',

    workflow:
      'Sensors continuously collect environmental parameters. The controller processes the readings, evaluates the operating condition, and activates the required control action automatically while providing monitoring through the IoT layer.',

    results_outcome:
      'Successfully developed the system and led the project team to secure First Prize at AutoBot Hackathon 2025.',

    featured: true,
    sort_order: 1,

    media: []
  },

  {
    id: 'p2-internship-recommendation',
    slug: 'internship-recommendation-system',
    title: 'Internship Recommendation System',

    short_description:
      'Web-based recommendation platform that matches students with suitable internship opportunities using a custom weighted selection algorithm.',

    category: 'Software & AI',
    status: 'COMPLETED',

    technologies: [
      'Python',
      'Flask',
      'Algorithmic Matching'
    ],

    thumbnail_url: null,

    github_url: 'https://github.com/samkiller07/internship-recommendation-system',
    demo_url: null,

    problem:
      'Students from different educational backgrounds often need help identifying internship opportunities that match their skills, sector preferences, education level, and location.',

    engineering_approach:
      'Designed a custom weighted recommendation algorithm that evaluates multiple candidate attributes instead of relying on a single matching parameter.',

    what_i_built:
      'Built a web-based internship recommendation platform designed for 10th, 12th, undergraduate, and postgraduate students.',

    system_architecture:
      'Student Profile -> Skill / Sector / Education / Location Inputs -> Weighted Matching Algorithm -> Internship Recommendation',

    workflow:
      'The user provides relevant academic and preference information. The system evaluates the profile using predefined weights and generates suitable internship recommendations.',

    results_outcome:
      'Implemented a weighted selection model using Skills (30%), Sector (30%), Education (20%), and Location (20%) to generate recommendations.',

    featured: true,
    sort_order: 2,

    media: []
  },

  {
    id: 'p3-hypermesh-automation',
    slug: 'hypermesh-tcl-automation-studio',
    title: 'HyperMesh Tcl Automation Studio',

    short_description:
      'Engineering automation suite using Tcl/Tk scripting to streamline repetitive Altair HyperMesh preprocessing and CAE workflow operations.',

    category: 'Engineering Software',
    status: 'COMPLETED',

    technologies: [
      'Tcl/Tk',
      'Altair HyperMesh',
      'FEA Preprocessing',
      'CAD Preparation',
      'Meshing',
      'Batch Automation'
    ],

    thumbnail_url: null,

    github_url: 'https://github.com/samkiller07/hypermesh_automated_tcl_script',
    demo_url:
      'https://samkiller07.github.io/hypermesh_automated_tcl_script/',

    problem:
      'CAE preprocessing involves several repetitive operations such as geometry preparation, meshing, quality checking, connector creation, and solver deck preparation.',

    engineering_approach:
      'Developed a modular Tcl/Tk automation workflow for HyperMesh that organizes repetitive preprocessing operations into reusable automation procedures.',

    what_i_built:
      'Built an automation studio covering CAD cleanup, defeaturing, midsurface extraction, meshing, washer creation, quality criteria, connectors, material and property setup, and solver deck export.',

    system_architecture:
      'CAD Input -> Geometry Cleanup -> Midsurface / Mesh Preparation -> Quality Checks -> Connectors / Properties -> Solver Deck Export',

    workflow:
      'The user selects the required preprocessing operation or pipeline. Tcl procedures execute the corresponding HyperMesh operations and prepare the model for subsequent CAE analysis.',

    results_outcome:
      'Created a reusable HyperMesh Tcl automation environment with modular procedures and batch execution support for engineering preprocessing workflows.',

    featured: true,
    sort_order: 3,

    media: []
  },

  {
    id: 'p4-human-activity-detection',
    slug: 'human-activity-object-detection',
    title: 'Human Activity & Object Detection',

    short_description:
      'Real-time computer vision system for human activity recognition and object detection using Python, OpenCV, and YOLO.',

    category: 'Computer Vision & AI',
    status: 'COMPLETED',

    technologies: [
      'Python',
      'OpenCV',
      'YOLO',
      'Computer Vision',
      'Object Detection'
    ],

    thumbnail_url: null,

    github_url: null,
    demo_url: null,

    problem:
      'Real-time visual monitoring requires systems that can identify objects and interpret basic human activities from camera input.',

    engineering_approach:
      'Developed a computer vision pipeline combining OpenCV-based image processing with YOLO-based deep-learning object detection.',

    what_i_built:
      'Engineered a real-time vision application capable of object detection and basic human posture analysis, including sitting and standing detection.',

    system_architecture:
      'Camera Input -> OpenCV Processing -> YOLO Object Detection -> Human Activity Analysis -> Real-Time Output',

    workflow:
      'The camera provides live frames which are processed using OpenCV. YOLO performs object detection while the activity recognition component analyses human posture to determine states such as sitting or standing.',

    results_outcome:
      'Developed a real-time computer vision pipeline optimized for low-latency image processing and practical activity/object detection.',

    featured: true,
    sort_order: 4,

    media: []
  },

  {
    id: 'p5-iot-smart-incubator',
    slug: 'iot-smart-incubator-monitoring',
    title: 'IoT Smart Incubator Monitoring & Control System',

    short_description:
      'IoT-enabled monitoring and control system for maintaining incubator environmental conditions using temperature and humidity sensing with automated control.',

    category: 'Embedded & IoT',
    status: 'COMPLETED',

    technologies: [
      'ESP8266',
      'Embedded C',
      'DHT11',
      'PID Control',
      'Relay',
      'IoT',
      'Web Monitoring'
    ],

    thumbnail_url: null,

    github_url: 'https://github.com/samkiller07/iot-incubator-monitoring-system',
    demo_url: null,

    problem:
      'Incubator environments require continuous monitoring and temperature control to maintain stable operating conditions.',

    engineering_approach:
      'Integrated temperature and humidity sensing with a PID-based temperature control mechanism and relay-based actuation.',

    what_i_built:
      'Built an IoT smart incubator system using an ESP8266, temperature/humidity monitoring, PID temperature control, relay actuation, and web-based monitoring.',

    system_architecture:
      'DHT11 Sensor -> ESP8266 -> PID Temperature Control -> Relay Actuation -> Incubator System -> Web Monitoring',

    workflow:
      'The ESP8266 continuously reads environmental conditions from the sensor. Temperature feedback is processed by the control logic and the relay is actuated accordingly. Monitoring data is made available through the web interface.',

    results_outcome:
      'Implemented integrated sensing, PID-based temperature control, relay actuation, and IoT web monitoring in a working prototype.',

    featured: false,
    sort_order: 5,

    media: []
  },

  {
    id: 'p6-plc-mini-automation-cell',
    slug: 'plc-mini-automation-cell',
    title: 'PLC Mini Automation Cell',

    short_description:
      'Simulated industrial automation cell developed in CODESYS using Ladder Logic for conveyor control, object detection, actuator sequencing, timers, interlocks, and fault indication.',

    category: 'Industrial Automation',
    status: 'COMPLETED',

    technologies: [
      'CODESYS',
      'PLC',
      'Ladder Logic',
      'Timers',
      'Sensors',
      'Actuator Control',
      'Interlocks'
    ],

    thumbnail_url: null,

    github_url: null,
    demo_url: null,

    problem:
      'Industrial automation systems require reliable sequencing, interlocking, fault handling, and coordinated control of conveyors, sensors, and actuators.',

    engineering_approach:
      'Designed a sequential PLC control system using Ladder Logic with motor latching, emergency-stop and overload interlocks, object detection, actuator sequencing, timer-based control, and fault indication.',

    what_i_built:
      'Built and tested a simulated automation cell in CODESYS consisting of a conveyor, object sensor, actuator, end sensor, home sensor, timers, motor control, and fault indication logic.',

    system_architecture:
      'START / STOP -> Conveyor -> Object Detection -> Conveyor Stop -> Actuator Forward -> END Detection -> Timer -> Conveyor Resume -> Actuator Return -> HOME',

    workflow:
      'The conveyor starts after the system is enabled. When an object is detected, the conveyor stops and the actuator moves forward. END feedback initiates a 2-second timed delay, after which the conveyor resumes and the actuator returns to HOME before the system becomes ready for the next cycle.',

    results_outcome:
      'Successfully simulated and tested the complete automation sequence in CODESYS SoftPLC including motor latching, safety interlocks, actuator control, timer logic, fault indication, and automatic cycle recovery.',

    featured: false,
    sort_order: 6,

    media: []
  }
];