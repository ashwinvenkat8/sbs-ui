// AuthorizeUserRequests.jsx
// AuthorizeTransactions.jsx
import React, { useEffect, useState } from 'react';

const ApprovedReviews = () => {
    // State to store the list of approved reviews
    const [approvedReviews, setApprovedReviews] = useState([]);

    useEffect(() => {
        // Function to fetch approved reviews
        const fetchApprovedReviews = async () => {
            try {
                const response = await fetch(''); // API to fetch approved reviews list
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setApprovedReviews(data); // Update the state with the fetched data
            } catch (error) {
                console.error("Failed to fetch approved reviews:", error);
            }
        };

        fetchApprovedReviews();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <h2>Approved Reviews</h2>
            <div>
                {approvedReviews.length > 0 ? (
                    <ul>
                        {approvedReviews.map((review, index) => (
                            <li key={index}>
                                {/* Display details of the review. Adjust according to your data structure */}
                                User: {review.user} - Review: {review.reviewText}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No approved reviews found.</p>
                )}
            </div>
        </div>
    );
};

export default ApprovedReviews;


