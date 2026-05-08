import React, { useEffect, useState } from 'react';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { LuUsers } from 'react-icons/lu';
import Modal from '../Modal';
import AvatarGroup from '../AvatarGroup';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
            setAllUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers);
        setIsModalOpen(false);
    };

    const selectedUserAvatars = allUsers
        .filter((user) => selectedUsers.includes(user._id))
        .map((user) => user.profileImageUrl);

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([]);
        }
    }, [selectedUsers]);

    return (
        <div className="space-y-3 mt-2">

            {/* TRIGGER */}
            {selectedUserAvatars.length === 0 ? (
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="
                        w-full flex items-center justify-center gap-2
                        px-3 py-2 rounded-xl
                        bg-white/5 border border-white/10
                        text-gray-300 hover:text-white
                        hover:border-indigo-400/30
                        backdrop-blur-xl transition
                    "
                >
                    <LuUsers />
                    Add Members
                </button>
            ) : (
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="
                        cursor-pointer p-2 rounded-xl
                        bg-white/5 border border-white/10
                        backdrop-blur-xl hover:border-indigo-400/30
                        transition
                    "
                >
                    <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
                </div>
            )}

            {/* MODAL */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Assign Team Members"
            >
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">

                    {allUsers.map((user) => {
                        const isSelected = tempSelectedUsers.includes(user._id);

                        return (
                            <div
                                key={user._id}
                                onClick={() => toggleUserSelection(user._id)}
                                className={`
                                    flex items-center gap-3 p-3 rounded-xl cursor-pointer
                                    border transition
                                    ${isSelected
                                        ? "bg-indigo-500/10 border-indigo-400/30"
                                        : "bg-white/5 border-white/10 hover:border-white/20"
                                    }
                                `}
                            >

                                <img
                                    src={
                                        user.profileImageUrl ||
                                        "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"
                                    }
                                    className="w-10 h-10 rounded-full border border-white/10"
                                    alt={user.name}
                                />

                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {user.email}
                                    </p>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        readOnly
                                        className="w-4 h-4 accent-indigo-500"
                                    />
                                </div>

                            </div>
                        );
                    })}

                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-white/10">

                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleAssign}
                        className="px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 hover:bg-indigo-500/30"
                    >
                        Done
                    </button>

                </div>

            </Modal>

        </div>
    );
};

export default SelectUsers;