import './ReviewForm.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { getReviews, postReview } from '../../Redux/actions';
import ReviewGrid from '../ReviewGrid/ReviewGrid';

const ReviewForm = () => {

    const dispatch = useDispatch();

    const reviews = useSelector((state) => state.reviews)
    console.log(reviews)

    const { id } = useParams();

    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    console.log(isAuthenticated)

    const userComment = user ? reviews.map((el) => el.name === user.name) : ""
    console.log("userComment ---> ", userComment)

    const [review, setReview] = useState({
        productId: id,
        image: '',
        name: '',
        score: 0,
        comment: ''
    });
    console.log(review)

    useEffect(() => {
        if (isAuthenticated) {
            setReview({
                ...review,
                image: user.picture,
                name: user.name
            })
        } else {
            setReview(review)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);


    const handleInputChange = (ev) => {
        setReview({
            ...review,
            [ev.target.name]: ev.target.value
        })
    };

    const rating = (ev) => {
        setReview({
            ...review,
            [ev.target.name]: ev.target.value
        })
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(postReview(review));
        dispatch(getReviews(id));
        dispatch(getReviews(id));
        dispatch(getReviews(id));
    };

    return (
        <div>
            <form name='form' novalidate onSubmit={(ev) => { handleSubmit(ev) }} >
                <section >
                    <div className="container my-5 py-5 text-dark">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-10 col-lg-8 col-xl-6">
                                <div className="card">
                                    <div className="card-body p-4">
                                        <div className="d-flex flex-start w-100">
                                            <div className="w-100">
                                                <h5>Add a comment</h5>
                                                <div className="row">
                                                    <div className="rating">
                                                        <input type="radio"
                                                            id="star5"
                                                            name="score"
                                                            value="5"
                                                            onChange={(ev) => { rating(ev) }}
                                                        /><label htmlFor="star5" title="perfect">5 stars</label>
                                                        <input type="radio"
                                                            id="star4"
                                                            name="score"
                                                            value="4"
                                                            onChange={(ev) => { rating(ev) }}
                                                        /><label htmlFor="star4" title="good">4 stars</label>
                                                        <input type="radio"
                                                            id="star3"
                                                            name="score"
                                                            value="3"
                                                            onChange={(ev) => { rating(ev) }}
                                                        /><label htmlFor="star3" title="nice">3 stars</label>
                                                        <input type="radio"
                                                            id="star2"
                                                            name="score"
                                                            value="2"
                                                            onChange={(ev) => { rating(ev) }}
                                                        /><label htmlFor="star2" title="meh">2 stars</label>
                                                        <input type="radio"
                                                            id="star1"
                                                            name="score"
                                                            value="1"
                                                            onChange={(ev) => { rating(ev) }}
                                                        /><label htmlFor="star1" title="bad">1 star</label>
                                                    </div>
                                                </div>
                                                <div className="form-outline">
                                                    <textarea
                                                        className="form-control"
                                                        name="comment"
                                                        value={review.comment}
                                                        onChange={(ev) => { handleInputChange(ev) }}
                                                        id="textAreaExample"
                                                        rows="4"
                                                    ></textarea>
                                                    <label className="form-label" htmlFor="textAreaExample">What is your view?</label>
                                                </div>
                                                <div className="d-flex justify-content-between mt-3" >
                                                    <button type={userComment.includes(true) ? "button" : "submit"}
                                                        className={review.comment === "" || review.score === 0 ?
                                                            "btn btn-success disabled" : "btn btn-success"}
                                                        data-bs-toggle={!isAuthenticated || userComment.includes(true) ? "modal" : ""}
                                                        data-bs-target={!isAuthenticated ? "#Authenticate" : userComment ? "#Commented" : ""}>
                                                        Send <i className="fas fa-long-arrow-alt-right ms-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
            <div className="modal fade" id="Authenticate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">You need to log in to comment</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-dismiss="modal" onClick={() => loginWithRedirect({ returnTo: window.location.origin })}>Log in</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="Commented" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">You can only comment once per product</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ReviewGrid reviews={reviews} />
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}

export default ReviewForm