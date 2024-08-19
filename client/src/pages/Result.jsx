import { Link, useNavigate, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import { RingProgress, SegmentedControl, ScrollArea } from '@mantine/core';
import { useState, useEffect } from "react";
import JobButton from "../components/JobButton";
import ActionButton from "../components/ActionButton";
import { useMediaQuery } from '@mantine/hooks';
import { ScrollToSection } from "../utils";

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState("resume");
    const { resume, jobDescription, resultData, similarity } = location.state || {};
    const isMobile = useMediaQuery('(max-width: 768px)');

    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState(
        similarity !== undefined ? parseInt((similarity * 100).toFixed(0)) : 0
    );

    const [jd, setJD] = useState(jobDescription);

    const handleJobButton = (text) => {
        // console.log("text job button", text);
        setShow('jobdesc');
        setJD(text);
        ScrollToSection('description')
    }

    const handleSwitch = (value) => {
        // console.log("value switch", value);
        // setShow('');
        if (value === 'jobdesc') {
            setShow('resume')
            // setJD(jobDescription);
        } else {
            setShow('jobdesc');
            setJD(jobDescription);
        }
    }

    useEffect(() => {
        // redirect to upload, if there is no data
        if (jd === undefined || resultData === undefined) {
            navigate('/upload');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <header>
                <nav className="flex justify-between items-center md:px-8 px-4 py-3 bg-navyGray">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img className="h-8 w-auto" src="/japan2.jpg" alt="" />
                        </Link>
                    </div>
                </nav>
            </header>
            <div className="flex-grow bg-slateGray">

                <div className="grid md:grid-cols-2 grid-cols-1">
                    <div className="">
                        {/* CONTENT KIRI */}
                        <div className="md:p-8 p-4 flex flex-col">
                            <div>
                                <p
                                    className="font-semibold text-3xl text-mintGreen"
                                >
                                    Your Result
                                </p>
                                <hr className="border-2 border-mintGreen w-40 mt-2" />
                            </div>
                            <div className="py-4 flex sm:flex-row flex-col items-center gap-4 px-6 bg-coolGray rounded-3xl my-4">
                                <RingProgress
                                    size={120}
                                    thickness={12}
                                    roundCaps
                                    label={
                                        <p className="flex justify-center items-center font-bold">
                                            {value >= 0 ? value : 0}%
                                        </p>
                                    }
                                    sections={[
                                        { value: value >= 0 ? value : 0, color: '#3BBA9C' },
                                    ]}
                                />
                                <p
                                    className="text-white text-lg font-semibold"
                                >
                                    the match between the cv and the job description is very poor</p>
                            </div>
                            <div>
                                <p
                                    className="font-semibold text-2xl text-mintGreen"
                                >
                                    Your Resume Match With This Job Description
                                </p>
                                <hr className="border-2 border-mintGreen sm:w-5/6 w-full mt-2 mb-10" />
                                {
                                    resultData ?
                                        (resultData.map((job, index) => (
                                            <JobButton
                                                key={index}
                                                handleClick={() => handleJobButton(job.description)}
                                                title={job.title}
                                                idx={index + 1}
                                                similarity={job.distance}
                                            />
                                        ))) :
                                        <p>tidak ada data</p>
                                }
                                {
                                    !isMobile && (
                                        <div className="flex justify-center">
                                            <ActionButton handleClick={() => navigate('/upload')} text="Analyze More" />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {/* CONTENT KANAN */}
                    <div className=" flex flex-col" id="description">
                        <div className="md:px-16 px-8 md:py-8 py-4 flex flex-col gap-4">
                            <SegmentedControl
                                color="#3BBA9C"
                                value={show}
                                onChange={() => handleSwitch(show)}
                                data={[
                                    { label: 'Your Resume', value: 'resume' },
                                    { label: 'Job Description', value: 'jobdesc' },
                                ]}
                                classNames={{
                                    root: 'bg-darkBlueGray',
                                    control: 'transition-all duration-300',
                                    label: 'text-white'
                                }}
                            />
                            <div className="bg-white rounded-2xl p-4">
                                <ScrollArea h={500}>
                                    {show === 'resume' ? (
                                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                            <p>{resume ? resume : "-"}</p>
                                        </pre>
                                    ) : (
                                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                            <p>{jd ? jd : "-"}</p>
                                        </pre>
                                    )}
                                </ScrollArea>

                            </div>
                            {
                                isMobile && (
                                    <div className="flex justify-center">
                                        <ActionButton handleClick={() => navigate('/upload')} text="Analyze More" />
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Result