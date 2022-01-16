import axios from "axios";
import React, { useReducer } from "react";

export const topicContext = React.createContext();

const INIT_STATE = {
    topicsData: [],
    topicsDetails: null,
    searchData: [],
};

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "GET_TOPICS":
            return { ...state, topicsData: action.payload };
        case "GET_TOPICS_DETAILS":
            return { ...state, topicsDetails: action.payload };
        case "SEARCH":
            return { ...state, searchData: action.payload };
        default:
            return state;
    }
};
const TopicContextProvider = ({ children }) => {
    function postNewTopic(topic) {
        axios.post("http://localhost:8000/topics", topic);
    }
    async function getTopics() {
        let { data } = await axios("http://localhost:8000/topics");
        dispatch({
            type: "GET_TOPICS",
            payload: data,
        });
    }

    async function getTopicDetails(id) {
        let { data } = await axios(`http://localhost:8000/topics/${id}`);
        console.log(data);
        dispatch({
            type: "GET_TOPICS_DETAILS",
            payload: data,
        });
    }
    async function saveTopic(id, newTopic) {
        axios.patch(`http://localhost:8000/topics/${id}`, newTopic);
        getTopicDetails(id);
    }
    const [state, dispatch] = useReducer(reducer, INIT_STATE);
    async function search(value) {
        let { data } = await axios(`http://localhost:8000/topics?q=${value}`);
        dispatch({
            type: "SEARCH",
            payload: data,
        });
    }
    return (
        <topicContext.Provider
            value={{
                postNewTopic,
                getTopics,
                getTopicDetails,
                saveTopic,
                search,
                topicsData: state.topicsData,
                topicDetails: state.topicsDetails,
                searchData: state.searchData,
            }}
        >
            {children}
        </topicContext.Provider>
    );
};
export default TopicContextProvider;
