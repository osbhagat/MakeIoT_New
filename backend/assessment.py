# MakeIoT Internship Certification Assessment

ASSESSMENTS = {
    "embedded": {
        "title": "Embedded System Design with STM32",
        "passing_score": 60,
        "questions": [
            {
                "id": 1,
                "question": "Which processor architecture is used in the STM32F4 series?",
                "options": [
                    "ARM Cortex-M4",
                    "ARM Cortex-A53",
                    "Intel x86",
                    "AVR"
                ],
                "correct_answer": 0
            },
            {
                "id": 2,
                "question": "Which peripheral is commonly used for serial communication?",
                "options": [
                    "ADC",
                    "UART",
                    "PWM",
                    "GPIO"
                ],
                "correct_answer": 1
            },
            {
                "id": 3,
                "question": "What is GPIO primarily used for?",
                "options": [
                    "Network communication",
                    "General-purpose digital input and output",
                    "Memory allocation",
                    "Operating system scheduling"
                ],
                "correct_answer": 1
            },
            {
                "id": 4,
                "question": "Which peripheral converts an analog voltage into a digital value?",
                "options": [
                    "DAC",
                    "UART",
                    "ADC",
                    "SPI"
                ],
                "correct_answer": 2
            },
            {
                "id": 5,
                "question": "PWM is commonly used for:",
                "options": [
                    "Controlling motor speed or LED brightness",
                    "Storing program memory",
                    "Connecting to the internet",
                    "Reading source code"
                ],
                "correct_answer": 0
            },
            {
                "id": 6,
                "question": "What does MCU stand for?",
                "options": [
                    "Main Computing Utility",
                    "Microcontroller Unit",
                    "Memory Control User",
                    "Machine Communication Unit"
                ],
                "correct_answer": 1
            },
            {
                "id": 7,
                "question": "Which communication protocol normally uses SCL and SDA lines?",
                "options": [
                    "UART",
                    "CAN",
                    "I2C",
                    "USB"
                ],
                "correct_answer": 2
            },
            {
                "id": 8,
                "question": "An interrupt allows a microcontroller to:",
                "options": [
                    "Respond to an event without continuously polling it",
                    "Increase its supply voltage",
                    "Increase flash memory",
                    "Convert AC to DC"
                ],
                "correct_answer": 0
            },
            {
                "id": 9,
                "question": "Which memory generally stores the firmware in an STM32 microcontroller?",
                "options": [
                    "Flash memory",
                    "Cache only",
                    "Hard disk",
                    "EEPROM only"
                ],
                "correct_answer": 0
            },
            {
                "id": 10,
                "question": "STM32CubeIDE is primarily used for:",
                "options": [
                    "Mechanical CAD",
                    "STM32 software development and debugging",
                    "PCB manufacturing",
                    "Database administration"
                ],
                "correct_answer": 1
            }
        ]
    },

    "iot": {
        "title": "Internet of Things with Arduino & ESP32",
        "passing_score": 60,
        "questions": [
            {
                "id": 1,
                "question": "What does IoT stand for?",
                "options": [
                    "Internet of Things",
                    "Integration of Technology",
                    "Interface of Terminals",
                    "Internet of Transmission"
                ],
                "correct_answer": 0
            },
            {
                "id": 2,
                "question": "Which ESP32 feature makes it useful for IoT applications?",
                "options": [
                    "Built-in Wi-Fi and Bluetooth",
                    "Mechanical relay",
                    "Built-in LCD display",
                    "Hard disk"
                ],
                "correct_answer": 0
            },
            {
                "id": 3,
                "question": "A sensor in an IoT system is primarily used to:",
                "options": [
                    "Collect information from the physical environment",
                    "Compile source code",
                    "Store websites",
                    "Increase internet speed"
                ],
                "correct_answer": 0
            },
            {
                "id": 4,
                "question": "Which protocol is commonly used to send lightweight IoT messages?",
                "options": [
                    "MQTT",
                    "HDMI",
                    "VGA",
                    "SATA"
                ],
                "correct_answer": 0
            },
            {
                "id": 5,
                "question": "Arduino IDE is commonly used to:",
                "options": [
                    "Write and upload programs to microcontroller boards",
                    "Design buildings",
                    "Edit videos",
                    "Create spreadsheets"
                ],
                "correct_answer": 0
            },
            {
                "id": 6,
                "question": "What is an actuator used for?",
                "options": [
                    "Performing a physical action based on a control signal",
                    "Only measuring temperature",
                    "Storing passwords",
                    "Compiling programs"
                ],
                "correct_answer": 0
            },
            {
                "id": 7,
                "question": "Which device can be controlled using a digital GPIO pin?",
                "options": [
                    "LED",
                    "Cloud database",
                    "Wi-Fi router password",
                    "Source code"
                ],
                "correct_answer": 0
            },
            {
                "id": 8,
                "question": "Cloud platforms in IoT are commonly used for:",
                "options": [
                    "Storing, processing and visualizing device data",
                    "Increasing battery voltage",
                    "Manufacturing sensors",
                    "Replacing microcontrollers"
                ],
                "correct_answer": 0
            },
            {
                "id": 9,
                "question": "Which ESP32 capability allows connection to a wireless router?",
                "options": [
                    "Wi-Fi",
                    "ADC",
                    "PWM",
                    "DAC"
                ],
                "correct_answer": 0
            },
            {
                "id": 10,
                "question": "An IoT system generally connects physical devices to:",
                "options": [
                    "A network or internet-based service",
                    "Only a battery",
                    "Only a keyboard",
                    "A mechanical gearbox"
                ],
                "correct_answer": 0
            }
        ]
    }
}