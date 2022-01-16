import React, { useContext, useEffect, useState } from "react";
import { topicContext } from "../../Contexts/TopicContext";
import "./TopicDetails.css";

const TopicDetail = (props) => {
    const { getTopicDetails, topicDetails, saveTopic } = useContext(
        topicContext
    );
    const [editStatus, setEditStatus] = useState(false);
    const [editedTopic, setEditedTopic] = useState({});

    const handleValue = (e) => {
        let newTopic = {
            ...editedTopic,
            [e.target.name]: e.target.value,
        };
        setEditedTopic(newTopic);
    };
    useEffect(() => {
        getTopicDetails(props.match.params.id);
    }, [editStatus]);
    const handleSave = () => {
        setEditStatus(false);
        saveTopic(props.match.params.id, editedTopic);
    };
    return (
        <div>
            {topicDetails ? (
                <div className="details">
                    {editStatus ? (
                        <div className="edit-textareas">
                            <textarea
                                name="title"
                                onChange={handleValue}
                                className="edit-details_items"
                            >
                                {topicDetails.title}
                            </textarea>
                            <textarea
                                name="description"
                                onChange={handleValue}
                                className="edit-details_items"
                            >
                                {topicDetails.description}
                            </textarea>
                            <textarea
                                name="img"
                                onChange={handleValue}
                                className="edit-details_items"
                            >
                                {topicDetails.img}
                            </textarea>
                            <textarea
                                name="subTitle"
                                onChange={handleValue}
                                className="edit-details_items"
                            >
                                {topicDetails.subTitle}
                            </textarea>
                            <textarea
                                name="secondDescription"
                                onChange={handleValue}
                                className="edit-details_items"
                            >
                                {topicDetails.secondDescription}
                            </textarea>
                            <textarea
                                name="secondImg"
                                onChange={handleValue}
                                className="edit-details_items"
                            >
                                {topicDetails.secondImg}
                            </textarea>
                        </div>
                    ) : (
                        <>
                            <h1 className="details_items">
                                {topicDetails.title}
                            </h1>
                            <p className="details_items">
                                {topicDetails.description}
                            </p>
                            <img
                                className="details_items"
                                src={topicDetails.img}
                                alt="logo"
                            />
                            <h2 className="details_items">
                                {topicDetails.subTitle}
                            </h2>
                            <p className="details_items">
                                {topicDetails.secondDescription}
                            </p>
                            <img
                                className="details_items"
                                src={topicDetails.secondImg}
                                alt="logo"
                            />
                        </>
                    )}
                    <br />
                    <div className="details_btns">
                        {editStatus ? (
                            <button onClick={handleSave}>
                                <img src="https://www.shareicon.net/data/512x512/2015/06/23/58789_add_512x512.png" />
                                Сохранить
                            </button>
                        ) : (
                            <button onClick={() => setEditStatus(true)}>
                                <img src="https://www.freeiconspng.com/uploads/edit-icon-orange-pencil-0.png" />
                                Редактировать
                            </button>
                        )}
                        <button>
                            <img src="https://www.shareicon.net/data/512x512/2015/06/23/58789_add_512x512.png" />
                            Добавить документацию
                        </button>
                    </div>
                </div>
            ) : (
                "Details"
            )}
        </div>
    );
};
export default TopicDetail;
