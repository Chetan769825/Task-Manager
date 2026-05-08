import React, { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from 'react-icons/lu';

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
    const [option, setOption] = useState("");

    const handleAddoption = () => {
        if (option.trim()) {
            setAttachments([...attachments, option.trim()]);
            setOption("");
        }
    };

    const handleDeleteOption = (index) => {
        const updateArr = attachments.filter((_, idx) => idx !== index);
        setAttachments(updateArr);
    };

    return (
        <div className="space-y-3">

            {/* LIST */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">

                {attachments.map((item, index) => (
                    <div
                        key={item + index}
                        className="
                            flex items-center justify-between
                            px-3 py-2 rounded-xl
                            bg-white/5 border border-white/10
                            backdrop-blur-xl
                            hover:border-indigo-400/20 transition
                        "
                    >

                        <div className="flex items-center gap-2 flex-1">

                            <LuPaperclip className="text-indigo-300 text-sm" />

                            <p className="text-xs text-gray-200 truncate">
                                {item}
                            </p>

                        </div>

                        <button
                            onClick={() => handleDeleteOption(index)}
                            className="p-1 rounded-lg hover:bg-red-500/10 transition"
                        >
                            <HiOutlineTrash className="text-red-400 text-lg" />
                        </button>

                    </div>
                ))}

            </div>

            {/* INPUT BAR */}
            <div className="
                flex items-center gap-2
                p-2 rounded-xl
                bg-white/5 border border-white/10
                backdrop-blur-xl
            ">

                <LuPaperclip className="text-gray-400 text-sm ml-1" />

                <input
                    type="text"
                    placeholder="Paste file link or attachment URL..."
                    value={option}
                    onChange={({ target }) => setOption(target.value)}
                    className="
                        flex-1 bg-transparent outline-none
                        text-sm text-white placeholder-gray-500
                        px-2
                    "
                />

                <button
                    onClick={handleAddoption}
                    className="
                        flex items-center gap-1 px-3 py-1.5 rounded-lg
                        bg-indigo-500/20 border border-indigo-400/20
                        text-indigo-200 hover:bg-indigo-500/30 transition
                    "
                >
                    <HiMiniPlus className="text-lg" />
                    Add
                </button>

            </div>

        </div>
    )
}

export default AddAttachmentsInput