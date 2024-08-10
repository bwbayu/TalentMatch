import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from 'react';
import { Stepper, Tabs, FileButton, Button, Textarea, Select, ScrollArea } from '@mantine/core';
import ActionButton from "../components/ActionButton";
import axios from 'axios';

const Upload = () => {
    const [active, setActive] = useState(0);
    const [file, setFile] = useState(null);
    const [resume, setResume] = useState('');
    const [isPasteView, setIsPasteView] = useState(false);
    const [jobDescriptionSelect, setJobDescriptionSelect] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const isStep1Valid = isPasteView ? resume.length > 0 : file !== null;
    const isStep2Valid = jobDescription.length > 0;
    const navigate = useNavigate();
    const dataJob = {
        'Data Science': 'sample job description data science',
        'Data Engineering': 'sample job description Data Engineering',
        'Fullstack Developer': 'sample job description Fullstack Developer',
        'Security Analyst': 'sample job description Security Analyst',
    }

    const nextStep = async () => {
        if (active === 0) {
            if (isStep1Valid) {
                if (file) {
                    await handleUpload(); // Upload the file
                }
                setActive((current) => current + 1); // Move to next step
            }
        } else if (active < 2) {
            setActive((current) => current + 1);
        } else if (active === 2) {
            navigate('/result');
        }
    };

    const toggleView = () => {
        setIsPasteView(prevState => !prevState);
        // reset
        setFile(null);
        setResume("");
    }

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("data resume pdf", response.data.text);
            setResume(response.data.text);
            setFile(null);
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    };

    useEffect(() => {
        setJobDescription(dataJob[jobDescriptionSelect] || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobDescriptionSelect]);

    return (
        <div className="bg-white flex flex-col min-h-screen w-screen">
            {/* NAVBAR */}
            <header>
                <nav className="flex justify-between items-center md:px-8 px-4 py-3 bg-navyGray">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img className="h-8 w-auto" src="/japan2.jpg" alt="" />
                        </Link>
                    </div>
                </nav>
            </header>
            <div className="flex-grow md:px-16 px-8 md:py-6 py-3 h-full bg-slateGray">
                <div className="">
                    <Stepper
                        active={active}
                        onStepClick={setActive}
                        allowNextStepsSelect={false}
                        iconPosition="left"
                        color="#3BBA9C"
                    >
                        {/* STEP 1 */}
                        <Stepper.Step label={<span style={{ color: '#3BBA9C' }}>Add Resume / CV</span>}>
                            <div className="mt-5">
                                {isPasteView ? (
                                    // TEXTAREA RESUME
                                    <div className="flex flex-col gap-4">
                                        <p className="font-semibold text-xl text-mintGreen">
                                            PASTE YOUR RESUME
                                            <hr className="border border-mintGreen w-52" />
                                        </p>
                                        <Textarea
                                            placeholder="Your resume..."
                                            autosize
                                            minRows={8}
                                            maxRows={8}
                                            value={resume}
                                            onChange={(event) => setResume(event.currentTarget.value)}
                                            styles={() => ({
                                                input: {
                                                    borderRadius: '0.5rem',
                                                },
                                            })}
                                        />
                                    </div>
                                ) : (
                                    // UPLOAD RESUME
                                    <div className="">
                                        <p className="font-semibold text-mintGreen text-xl">
                                            UPLOAD YOUR RESUME
                                            <hr className="border border-mintGreen w-56" />
                                        </p>
                                        <div className="mt-5 border border-white flex justify-center rounded-md">
                                            <div className="py-10 flex flex-col gap-2 items-center">
                                                <p className="font-semibold text-lg text-white">
                                                    Upload your resume to get started
                                                </p>
                                                <div className="flex flex-col justify-center items-center gap-x-2">
                                                    <FileButton onChange={setFile} accept=".pdf, .doc, .docx">
                                                        {(props) => (
                                                            <Button
                                                                {...props}
                                                                style={{
                                                                    backgroundColor: '#2E3047',
                                                                    color: '#fff',
                                                                    transition: 'background-color 0.3s, color 0.3s',
                                                                }}
                                                            // onMouseEnter={(e) => {
                                                            //     e.target.style.backgroundColor = '#3BBA9C';
                                                            //     e.target.style.color = '#000000';
                                                            // }}
                                                            // onMouseLeave={(e) => {
                                                            //     e.target.style.backgroundColor = '#2E3047';
                                                            //     e.target.style.color = '#fff';
                                                            // }}
                                                            >
                                                                Upload your resume
                                                            </Button>
                                                        )}
                                                    </FileButton>
                                                    {file && (
                                                        <p className="text-white">
                                                            {file.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <p className="text-sm text-white">
                                                    as .pdf or .docsx file
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col justify-center gap-2 items-center">
                                <ActionButton handleClick={nextStep} text="Continue" disabled={!isStep1Valid} />
                                <Link
                                    onClick={toggleView}
                                    className="text-white hover:text-mintGreen text-sm cursor-pointer"
                                >
                                    Or {isPasteView ? 'upload resume file' : 'paste resume text'}
                                </Link>
                            </div>
                        </Stepper.Step>
                        {/* STEP 2 */}
                        <Stepper.Step label={<span style={{ color: '#3BBA9C' }}>Add Job Description</span>}>
                            <div className="mt-5">
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between">
                                        <p className="font-semibold text-xl text-mintGreen">
                                            PASTE A JOB DESCRIPTION
                                            <hr className="border border-mintGreen w-64" />
                                        </p>
                                        <Select
                                            placeholder="Select sample"
                                            data={['Data Science', 'Data Engineering', 'Fullstack Developer', 'Security Analyst']}
                                            allowDeselect={false}
                                            value={jobDescriptionSelect}
                                            onChange={setJobDescriptionSelect}
                                            styles={() => ({
                                                input: {
                                                    backgroundColor: '#2E3047',
                                                    color: '#fff',
                                                },
                                            })}
                                        />
                                    </div>
                                    <Textarea
                                        placeholder="Job description..."
                                        autosize
                                        minRows={8}
                                        maxRows={8}
                                        value={jobDescription}
                                        onChange={(event) => setJobDescription(event.currentTarget.value)}
                                        styles={() => ({
                                            input: {
                                                borderRadius: '0.5rem',
                                            },
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center gap-2 items-center">
                                <ActionButton handleClick={nextStep} text="Continue" disabled={!isStep2Valid} />
                            </div>
                        </Stepper.Step>
                        {/* STEP 3 */}
                        <Stepper.Step label={<span style={{ color: '#3BBA9C' }}>Analyze</span>}>
                            <div className="mt-5">
                                <Tabs color="#3BBA9C" radius="xs" defaultValue="resume">
                                    <Tabs.List>
                                        <Tabs.Tab value="resume" color="#3BBA9C" >
                                            {<span style={{ color: '#3BBA9C' }}>Your Resume</span>}
                                        </Tabs.Tab>
                                        <Tabs.Tab value="jobDescription" color="#3BBA9C">
                                            {<span style={{ color: '#3BBA9C' }}>Your Job Description</span>}
                                        </Tabs.Tab>
                                    </Tabs.List>

                                    <Tabs.Panel value="resume">
                                        <div className="bg-white rounded-md p-4 mt-4">
                                            <ScrollArea h={200}>
                                                {/* Gallery tab content Charizard is a draconic, bipedal Pokémon. It is primarily orange with a cream
                                                underside from the chest to the tip of its tail. It has a long neck, small blue eyes, slightly raised
                                                nostrils, and two horn-like structures protruding from the back of its rectangular head. There are two
                                                fangs visible in the upper jaw when its mouth is closed. Two large wings with blue-green undersides
                                                sprout from its back, and a horn-like appendage juts out from the top of the third joint of each wing.
                                                A single wing-finger is visible through the center of each wing membrane. Charizard arms are short
                                                and skinny compared to its robust belly, and each limb has three white claws. It has stocky legs with
                                                cream-colored soles on each of its plantigrade feet. The tip of its long, tapering tail burns with a
                                                sizable flame. As Mega Charizard X, its body and legs are more physically fit, though its arms remain
                                                thin. Its skin turns black with a sky-blue underside and soles. Two spikes with blue tips curve upward
                                                from the front and back of each shoulder, while the tips of its horns sharpen, turn blue, and curve
                                                slightly upward. Its brow and claws are larger, and its eyes are now red. It has two small, fin-like
                                                spikes under each horn and two more down its lower neck. The finger disappears from the wing membrane,
                                                and the lower edges are divided into large, rounded points. The third joint of each wing-arm is adorned
                                                with a claw-like spike. Mega Charizard X breathes blue flames out the sides of its mouth, and the f
                                                lame on its tail now burns blue. It is said that its new power turns it black and creates more intense
                                                flames. Gallery tab content Charizard is a draconic, bipedal Pokémon. It is primarily orange with a
                                                cream underside from the chest to the tip of its tail. It has a long neck, small blue eyes, slightly
                                                raised nostrils, and two horn-like structures protruding from the back of its rectangular head. There
                                                are two fangs visible in the upper jaw when its mouth is closed. Two large wings with blue-green
                                                undersides sprout from its back, and a horn-like appendage juts out from the top of the third joint
                                                of each wing. A single wing-finger is visible through the center of each wing membrane. Charizard
                                                arms are short and skinny compared to its robust belly, and each limb has three white claws.
                                                It has stocky legs with cream-colored soles on each of its plantigrade feet. The tip of its long,
                                                tapering tail burns with a sizable flame. As Mega Charizard X, its body and legs are more physical
                                                ly fit, though its arms remain thin. Its skin turns black with a sky-blue underside and soles. Tw
                                                o spikes with blue tips curve upward from the front and back of each shoulder, while the tips of
                                                its horns sharpen, turn blue, and curve slightly upward. Its brow and claws are larger, and its e
                                                yes are now red. It has two small, fin-like spikes under each horn and two more down its lower ne
                                                ck. The finger disappears from the wing membrane, and the lower edges are divided into large, roun
                                                ded points. The third joint of each wing-arm is adorned with a claw-like spike. Mega Charizard X b
                                                reathes blue flames out the sides of its mouth, and the flame on its tail now burns blue. It is sa
                                                id that its new power turns it black and creates more intense flames. */}
                                                {resume}
                                            </ScrollArea>
                                        </div>
                                    </Tabs.Panel>

                                    <Tabs.Panel value="jobDescription">
                                        <div className="bg-white rounded-md p-4 mt-4">
                                            <ScrollArea h={200}>
                                                {jobDescription}
                                            </ScrollArea>
                                        </div>
                                    </Tabs.Panel>
                                </Tabs>
                            </div>
                            <div className="flex flex-col justify-center gap-2 items-center">
                                <ActionButton handleClick={nextStep} text="Analyze" />
                            </div>
                        </Stepper.Step>
                    </Stepper>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Upload;
