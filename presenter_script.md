# CONCOURSE - Video Submission Demo Script

This script provides a 60–90 second walkthrough guide per feature area, tailored for the PromptWars submission video.

---

## 🎙️ Section 1: Introduction & Shell Layout (60s)
* **Visuals**: Load the app on the AT&T Dallas Stadium node. Point out the near-black charcoal background (`#12151A`), the persistent Left Agent Rail, the central top-down Stadium Bowl SVG, and the bottom LED marquee.
* **Script**:
  > "Welcome to CONCOURSE, a next-generation command-center web app built for stadium operators during the 2026 FIFA World Cup. Inspired by the view from the operations booth, CONCOURSE avoids generic dashboard templates, using a bespoke radial top-down abstraction of the stadium bowl as its hero centerpiece. 
  > On the left, our Multi-Agent Activity Rail displays live operations telemetry, showing cooperation between LLM Reasoning nodes, Workflow Orchestrators, and Custom Tools. On the right, the Context Panel details wayfinding routes and housing our Gemini Live translation assistant. At the bottom, a continuous LED ribbon ticker feeds active weather, transit, and cyber alerts to the staff in real time."

---

## 🎙️ Section 2: Crowd Heatmap & Bottleneck Alerts (90s)
* **Visuals**: Toggle between Ingress and Egress flow phases. Hover over wedges and show the occupancy levels. Click the "Trigger Bottleneck" button, and watch Gate C and Gate B turn red/amber. Point out the warnings flashing in the Left Agent Rail.
* **Script**:
  > "Let's look at the crowd management module. The stadium bowl wedges dynamically shift color based on real-time crowd density—green is nominal, amber is caution, and red indicates critical density over 90%. Operators can instantly switch between Ingress and Egress phases, changing flow speed vectors.
  > If I click 'Trigger Bottleneck', our LLM Predictive Forecaster detects a sudden surge at Gate C. A warning alert immediately logs in the Multi-Agent Rail. As an operator, I can override this manually by clicking 'Close Gate C' to redirect traffic, which triggers the Workflow Redirector agent to recalculate routing matrices and post signs to divert fans to the adjacent Gate D."

---

## 🎙️ Section 3: Navigation & Accessibility Routing (90s)
* **Visuals**: Select Gate B or Gate D on the map to show the route overlay. Toggle "Acc Routing" in the header to show the path shift to a dashed yellow elevator/ramp-only layout. Now click Gate C to show the red critical alert path and the green recommended AI alternate path to Gate D.
* **Script**:
  > "For indoor wayfinding and navigation, CONCOURSE implements live pathfinding. When I tap Gate D, the map draws a direct waypoint path from the operations center to the seat zone.
  > If we toggle 'Acc Routing' in the header, the pathfinder reroutes instantly, avoiding steep staircases in favor of elevators and step-free ramps.
  > More importantly, if I select the congested Gate C, our AI navigation engine recognizes the risk and displays a critical red path alert. At the same time, it calculates a live reroute path in green, guiding the operator to direct staff to lead incoming traffic through Gate D instead."

---

## 🎙️ Section 4: Multilingual Translation & Live Dispatch (90s)
* **Visuals**: In the right panel, select the "Lost Child Assistance" or "Medical Aid Request (Heat)" scenario. The mic status will animate, and the fan query (in Arabic or Spanish) will translate into English. Show the Affective Tone analyzer ("Anxious / Panicked") and Distress Score (92%). Click "Dispatch Agent" and watch the Left Rail log the custom agent deploying.
* **Script**:
  > "World Cup host stadiums welcome fans from all 3 host countries and 48 competing nations. To assist staff, CONCOURSE integrates a Gemini Live-style speech translation assistant. 
  > I can select a pre-recorded demo—such as this Arabic lost child inquiry. The system auto-detects Arabic, streams the audio, and outputs a transcript and English translation. 
  > The engine also runs affective analysis, matching vocal stress and indicating a 92% Panic score. When the operator clicks 'Dispatch Agent', this incident hands off directly to our Left Agent Grid, triggering a custom Security & Family Reunification agent to deploy responders on-site."

---

## 🎙️ Section 5: Transit Logistics & Staging (60s)
* **Visuals**: Click the "Transit & Logistics" tab. Point out the load ratios of train lines. Click "Inject Shuttle" on Metro Green Line. Then use the staging yard buttons to adjust queue count and trigger logs.
* **Script**:
  > "Under Transit & Logistics, we monitor the stadium's external transit nodes. We can see Metro Green Line is currently overloaded. With one click, the operator can 'Inject a Shuttle', which registers a custom Bus Dispatch tool to deploy backup transportation and reduce line pressure.
  > On the right, we monitor our freight staging yard Bay E. When deliveries backlog, operators can coordinate gate and bay allocations. If the queue backlog exceeds threshold, the LLM Logistics Optimizer logs warning redirects to prevent freight gridlock near critical spectator gates."

---

## 🎙️ Section 6: Operational Intel & Cyber Matrix (60s)
* **Visuals**: Click the "Threat Matrix" tab. Point out the risk scorecard gauge showing Azteca Stadium (base score 79, peak incident window, dominant crimes) and the Cybersecurity Threat Matrix table.
* **Script**:
  > "In the Threat Matrix panel, we compile physical and digital intelligence. For Azteca Stadium, our scorecard shows a base score of 79, placing it in the High Risk Tier, with peak incident windows coinciding with egress.
  > Below, we render our Cybersecurity Threat Matrix. It details active vector vectors—such as hospitality ransomware, DDoS transit attacks, and QR ticket fraud—along with actor classes, target surfaces, and severity ratings, enabling unified cybersecurity oversight."

---

## 🎙️ Section 7: Sustainability Zero-Waste Tracker (60s)
* **Visuals**: Click the "Sustainability" tab. Point out the Composting/Recycling diversion pie chart. Move the Sort Belt Speed and Sorter Personnel sliders, showing efficiency and recovery rates updating.
* **Script**:
  > "Sustainability is key to tournament operations. Modeled on Mercedes-Benz Stadium's zero-waste initiative, this view monitors compostable-vs-landfill diversion.
  > We can tune the belt speed and sorters count sliders in our Resource Recovery Room. Slower belt speeds with higher sorters count produce peak sorting efficiency, increasing our diversion rate towards our 90%+ zero-waste target."

---

## 🎙️ Section 8: Monte Carlo Forecasting & Conclusion (90s)
* **Visuals**: Click the "Monte Carlo" tab. Drag the Odds Skew, Weather Severity, and Transit Disruption sliders. The Recharts Area Chart probability distribution curve updates in real-time. Click "Deploy" on the recommended pre-positioning checklist. Toggle the "High Contrast" button to show the accessibility pass.
* **Script**:
  > "Finally, our Real-Time Decision Support engine uses Monte Carlo simulations. By adjusting match outcome odds, weather severity, and transit disruptions, the engine runs 10,000 simulations.
  > It outputs a probability distribution curve showing where bottlenecks are likely to form. When the risk spike shifts to Gate C, the AI-recommended checklist prompts operators to pre-position resources. Tapping 'Deploy' triggers a deployment team alert.
  > With our High Contrast mode toggle providing instant visual relief for low-vision operators, CONCOURSE represents a complete, accessible digital twin command system for tournament operations. Thank you."
