import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from 'react';
import { Stepper } from '@mantine/core';
import ActionButton from "../components/ActionButton";
import { FileButton, Button } from '@mantine/core';
import { Textarea } from '@mantine/core';
import { Select } from '@mantine/core';

const Upload = () => {
    const [active, setActive] = useState(0);
    const [file, setFile] = useState(null);
    const [resume, setResume] = useState('');
    const [isPasteView, setIsPasteView] = useState(false);
    const [jobDescriptionSelect, setJobDescriptionSelect] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const toggleView = () => setIsPasteView(prevState => !prevState);
    const dataJob = {
        'Data Science': 'sample job description data science',
        'Data Engineering': 'sample job description Data Engineering',
        'Fullstack Developer': 'sample job description Fullstack Developer',
        'Security Analyst': 'sample job description Security Analyst',
    }

    useEffect(() => {
        setJobDescription(dataJob[jobDescriptionSelect] || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobDescriptionSelect]);

    return (
        <div className="bg-white flex flex-col min-h-screen w-screen">
            <header>
                <nav className="flex justify-between items-center md:px-8 px-4 py-3 bg-gray-600">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img className="h-8 w-auto" src="public/japan2.jpg" alt="" />
                        </Link>
                    </div>
                </nav>
            </header>
            <div className="flex-grow md:px-16 px-8 md:py-8 py-4">
                <div className="">
                    <Stepper
                        active={active}
                        onStepClick={setActive}
                        allowNextStepsSelect={false}
                        iconPosition="left"
                    >
                        <Stepper.Step label="Add Resume / CV">
                            <div className="mt-5">
                                {isPasteView ? (
                                    // PASTE YOUR RESUME view
                                    <div className="flex flex-col gap-4">
                                        <p className="font-semibold text-xl">
                                            PASTE YOUR RESUME
                                            <hr className="border border-black w-52" />
                                        </p>
                                        <Textarea
                                            placeholder="Your resume..."
                                            autosize
                                            minRows={8}
                                            value={resume}
                                            onChange={(event) => setResume(event.currentTarget.value)}
                                        />
                                    </div>
                                ) : (
                                    // UPLOAD YOUR RESUME view
                                    <div className="">
                                        <p className="font-semibold text-xl">
                                            UPLOAD YOUR RESUME
                                            <hr className="border border-black w-56" />
                                        </p>
                                        <div className="mt-5 border border-black flex justify-center rounded-md">
                                            <div className="py-10 flex flex-col gap-2 items-center">
                                                <p className="font-semibold text-lg">
                                                    Upload your resume to get started
                                                </p>
                                                <div className="flex flex-row justify-center items-center gap-x-2">
                                                    <FileButton onChange={setFile} accept=".pdf, .doc, .docx">
                                                        {(props) => (
                                                            <Button
                                                                {...props}
                                                                style={{
                                                                    backgroundColor: '#1e3a8a',
                                                                    color: '#fff',
                                                                }}
                                                            >
                                                                Upload your resume
                                                            </Button>
                                                        )}
                                                    </FileButton>
                                                    {file && (
                                                        <p>
                                                            {file.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <p className="text-sm">
                                                    as .pdf or .docsx file
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col justify-center gap-2 items-center">
                                <ActionButton handleClick={nextStep} text="Continue" />
                                <Link
                                    onClick={toggleView}
                                    className="text-black text-sm cursor-pointer"
                                >
                                    Or {isPasteView ? 'upload resume file' : 'paste resume text'}
                                </Link>
                            </div>
                        </Stepper.Step>
                        <Stepper.Step label="Add Job Description">
                            <div className="mt-5">
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between">
                                        <p className="font-semibold text-xl">
                                            PASTE A JOB DESCRIPTION
                                            <hr className="border border-black w-64" />
                                        </p>
                                        <Select
                                            placeholder="Select sample"
                                            data={['Data Science', 'Data Engineering', 'Fullstack Developer', 'Security Analyst']}
                                            allowDeselect={false}
                                            value={jobDescriptionSelect}
                                            onChange={setJobDescriptionSelect}
                                        />
                                    </div>
                                    <Textarea
                                        placeholder="Job description..."
                                        autosize
                                        minRows={8}
                                        value={jobDescription}
                                        onChange={(event) => setJobDescription(event.currentTarget.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center gap-2 items-center">
                                <ActionButton handleClick={nextStep} text="Continue" />
                            </div>
                        </Stepper.Step>
                        <Stepper.Step label="Analyze">
                            <div className="mt-5">
                                <p className="font-semibold text-xl">
                                    TABS
                                </p>
                            </div>
                            <div className="flex flex-col justify-center gap-2 items-center">
                                <ActionButton handleClick={nextStep} text="Continue" />
                            </div>
                        </Stepper.Step>
                        <Stepper.Completed>
                            Completed, click back button to get to previous step
                        </Stepper.Completed>
                    </Stepper>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Upload;
