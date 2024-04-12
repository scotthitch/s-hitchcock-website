<script setup lang="ts">
import DownloadAssetButton from '../../components/DownloadAssetButton.vue'
import cvURL from '../../assets/scott_hitchcock_cv.pdf'
import PageIntro from '../../components/PageIntro.vue'
import PrimaryTitle from './PrimaryTitle.vue'
import SecondaryTitle from './SecondaryTitle.vue'
import DateTitle from './DateTitle.vue'
import TextContent from './TextContent.vue'
</script>

<template>
    <div class="overflow-scroll bg-col-primary">
        <PageIntro pageName="Resume" />
        <div class="flex flex-row justify-center">
            <!-- class="text-col-primary basis-[60%] flex flex-col gap-5 sm:gap-7 px-4 sm:px-6 md:pr-24 lg:pr-24 xl:pr-[260px] py-4 bg-col-secondary" -->

            <div
                class="text-col-secondary basis-[33%] flex flex-col gap-5 sm:gap-7 px-4 sm:px-6 lg:pl-20 xl:pl-[200px] pb-4 bg-cv-blue"
            >
                <div class="flex flex-col justify-center text-center">
                    <img
                        src="../../assets/profile_photo.png"
                        class="mx-auto w-14 xs:w-24 sm:w-30"
                    />
                    <div class="font-bold italic text-2xl text-center">Scott Hitchcock</div>
                    <div class="h-[1.5px] w-6 bg-col-secondary self-center my-3"></div>
                    <TextContent class="text-col-tertiary" content="MECHATRONICS GRADUATE" />
                </div>
                <div>
                    <PrimaryTitle content="Links" />
                    <TextContent class="text-col-tertiary" content="LinkedIn" />
                    <TextContent class="text-col-tertiary" content="Github" />
                </div>

                <!-- SKILLS -->
                <div class="flex flex-col gap-3">
                    <div>
                        <PrimaryTitle content="Skills" />
                        <SecondaryTitle content="Software:" />
                        <TextContent
                            class="text-col-tertiary"
                            content="Python, C, C++, Full Stack Web Development, MATLAB, Bash, Git, LabVIEW, PLC Ladder Logic."
                        />
                    </div>
                    <div>
                        <SecondaryTitle content="Electrical:" />
                        <TextContent
                            class="text-col-tertiary"
                            content="PCB design (Altium, KiCad), Soldering."
                        />
                    </div>
                    <div>
                        <SecondaryTitle content="Mechanical:" />
                        <TextContent
                            class="text-col-tertiary"
                            content="CAD (SOLIDWORKS), Lathes, Milling Machines, Arc Welding, 3D Printing."
                        />
                    </div>
                    <div>
                        <SecondaryTitle content="Extra:" />
                        <TextContent
                            class="text-col-tertiary"
                            content=" Workplace First Aid Certificate,  Microsoft Office, Intermediate Spanish."
                        />
                    </div>
                </div>

                <!-- PERSONAL INTERESTS -->
                <div>
                    <PrimaryTitle content="Personal Interests" />
                    <TextContent
                        class="text-col-tertiary"
                        content="In my free time, I take great pleasure in engaging in various sports activities, including hockey, golf, squash, surfing, skiing, and running. I also have a huge passion for travelling and exploring new destinations. I also thoroughly enjoy socialising with friends. Additionally, I actively participated in university culture being the treasurer of Opsoc, a university club."
                    />
                </div>

                <div class="flex flex-col gap-3">
                    <div>
                        <PrimaryTitle content="Volunteer Work" />
                        <SecondaryTitle content="Opsoc (2022, 2023):" />
                        <TextContent
                            class="text-col-tertiary"
                            content="I hosted the Charity Art Auction with proceeds going to Ukraine war relief, Waiheke penguins support and Gisborne flooding relief."
                        />
                    </div>
                    <div>
                        <SecondaryTitle content="Rochester and Rutherford (2020):" />
                        <TextContent
                            class="text-col-tertiary"
                            content="Ronald McDonald House Charity Dinners."
                        />
                    </div>

                    <div>
                        <SecondaryTitle content="Student Volunteer Army (2020):" />
                        <TextContent
                            class="text-col-tertiary"
                            content="Queenstown Reforestation project."
                        />
                    </div>
                </div>
            </div>
            <div
                class="text-col-primary basis-[67%] flex flex-col gap-5 sm:gap-7 px-4 sm:px-6 md:pr-24 lg:pr-24 xl:pr-[260px] py-4 bg-col-secondary"
            >
                <div>
                    <PrimaryTitle content="Profile" />
                    <TextContent
                        content="I am a determined, hardworking, and friendly person who loves a challenge.
                        One of my best qualities is my eagerness to learn new things, and my ability
                        to learn them quickly. I'm not afraid of heavy workloads and am constantly
                        pushing myself to be the best I can. I thrive in team environments, finding
                        them highly rewarding. Currently, I am looking for an opportunity in a
                        mechatronics or software engineering graduate role starting immediately."
                    />
                </div>

                <div class="flex flex-col gap-3">
                    <div>
                        <PrimaryTitle content="Education" />
                        <SecondaryTitle
                            content="B.E. in Mechatronics (Hons) Undergrad, University of Canterbury,
                        Christchurch"
                        />
                        <DateTitle content="FEBRUARY 2020 - NOVEMBER 2023" />
                        <TextContent content="GPA of 8.09 - First Class Honours." />
                    </div>
                    <div>
                        <SecondaryTitle content="High School, St. Pauls Collegiate, Hamilton" />
                        <DateTitle content="JANUARY 2017 - NOVEMBER 2018" />
                        <TextContent content="Endorsed NCEA level 2 and 3 with excellence." />
                    </div>
                </div>

                <!-- EMPLOYMENT HISTORY -->
                <div class="flex flex-col gap-3">
                    <div>
                        <PrimaryTitle content="Employment History" />

                        <SecondaryTitle
                            content="Software Development Intern, Trimble, Christchurch"
                        />
                        <DateTitle content="NOVEMBER 2022 - FEBRUARY 2023" />
                        <TextContent
                            content="As a software developer at Trimble in Christchurch, I contributed to the
                        development and testing of Earthworks, a grade control product for
                        earthmoving machinery. This internship strengthened my ability in Scrum
                        methodology utilising JIRA, as well as in C++, JavaScript, and effective
                        communication within a large development team. Additionally, I gained
                        valuable experience in software development using Visual Studio, Visual
                        Studio Code, and Android Studio."
                        />
                    </div>
                    <div>
                        <SecondaryTitle
                            content="Production Insight Engineering Intern, Bluelab, Tauranga"
                        />
                        <DateTitle content="NOVEMBER 2021 - FEBRUARY 2022" />
                        <TextContent
                            content="I developed a full-stack web app to provide Bluelab visibility into their
                        production performance. This project involved meeting with key stakeholders,
                        mapping and prototyping the system, documenting development and critical
                        decisions, and delivering a functional product. The technologies involved in
                        the project included React for frontend design, PostgreSQL and FASTApi for
                        the backend, AWS for hosting, and Asana and Confluence for project
                        management and documentation."
                        />
                    </div>
                </div>

                <!--  ACHIEVEMENTS -->
                <div>
                    <PrimaryTitle content="Achivements" />

                    <ul class="list-disc pl-4">
                        <li>
                            <TextContent content="B.E. First Class Honours (2023)" />
                        </li>
                        <li>
                            <TextContent
                                content="Rochester and Rutherford Recognition of Grades (2020)"
                            />
                        </li>
                        <li>
                            <TextContent content="UC Undergraduate Entrance Scholarship (2020)" />
                        </li>
                        <li>
                            <TextContent content="Year 13 House Prefect (2018)" />
                        </li>
                    </ul>
                </div>

                <!-- RELEVANT PROJECTS -->
                <div class="flex flex-col gap-3">
                    <div>
                        <PrimaryTitle content="Relevant Projects" />
                        <SecondaryTitle content="Golf Swing Tracer" />
                        <DateTitle content="APRIL 2023 - JUNE 2023" />

                        <TextContent
                            content="In my final year computer vision course, I designed an automated method for
                        detecting and tracking the head of a golf driver throughout a swing
                        sequence. In this project, I utilised PyTorch to train a YOLOv8 model for
                        detecting the head of the driver. I also employed additional methods to
                        enhance the swing tracing, such as morphological operations, frame
                        differencing, and cubic spline interpolation all using OpenCV in Python."
                        />
                    </div>
                    <div>
                        <SecondaryTitle content="Wacky Racers" />
                        <DateTitle content="MARCH 2023 - MAY 2023" />
                        <div class="font-medium text-sm">
                            <TextContent
                                content="In a four-member team, we designed, assembled, and programmed PCBs for
                        'Wacky Racers' in our final year embedded systems course. Our goal was to
                        create a 'racer' and a 'hat' for control. The hat transmitted accelerometer
                        data to the racer via radio, steering the racer's motors. The project
                        encompassed Altium-based PCB design and assembly, circuit design and
                        programming two microcontrollers in C. This project refined my reasoning and
                        debugging skills."
                            />
                        </div>
                    </div>
                    <div>
                        <SecondaryTitle content="Robocup" />
                        <DateTitle content="APRIL 2022 - OCTOBER 2022" />
                        <TextContent
                            content="In a three-person team during our third-year mechatronics design course, we
                        created an autonomous robot for a class competition. The robot autonomously
                        navigated, detected objects, and collected target weights. The project
                        encompassed software design using Arduino, mechanical design with
                        SOLIDWORKS, and control algorithm and circuit design to develop this
                        mechatronics system."
                        />
                    </div>
                    <div>
                        <SecondaryTitle content="Wordle Solver" />
                        <DateTitle content="JANUARY 2022 - FEBRUARY 2022" />
                        <TextContent
                            content="In my free time, I created a Python solver for the popular online game
                        Wordle. This project emphasised abstract thinking and problem-solving. This
                        project showcases my ability to strategically approach challenges and
                        demonstrates my passion for creative problem-solving."
                        />
                    </div>
                </div>
            </div>
        </div>
        <!-- <DownloadAssetButton
            buttonName="Download a Copy Here"
            :assetPath="cvURL"
            assetFileType="pdf"
            downloadName="Scott Hitchcock CV"
        /> -->
    </div>
</template>
