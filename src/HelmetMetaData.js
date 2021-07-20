import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
export default function HelmetMetaData(props) {

    let currentUrl = props.url !== undefined ? props.url : "https://musify-7ba7c.web.app/"
    let quote = props.quote !== undefined ? props.quote : "";
    let title = props.title !== undefined ? props.title : "Musify - Enjoy Ad Free Premium Content Music";
    let image = props.image !== undefined ? props.image : "https://musify-7ba7c.web.app/static/media/logo.6714a076.png";
    let description = props.description !== undefined ? props.description : "Tired of listening to ads and premium subscriptions while streaming music? Well you might like my new music streaming app #musify in this case. " +
        "Pls visit https://musify-7ba7c.web.app/ for fresh music content ad free. You just need to sign in using your google credentials and enjoy high quality(320, 640, 1080kbps) ad free music. " +
        "The mobile app for this is coming soon as well.";
    let hashtag = props.hashtag !== undefined ? props.hashtag : "#musify";
    return (
        <Helmet>
            <title>{title}</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="csrf_token" content="" />
            <meta property="type" content="website" />
            <meta property="url" content={currentUrl} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="_token" content="" />
            <meta name="robots" content="noodp" />
            <meta property="title" content={title} />
            <meta property="quote" content={quote} />
            <meta name="description" content={description} />
            <meta property="image" content={image} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:quote" content={quote} />
            <meta property="og:hashtag" content={hashtag} />
            <meta property="og:image" content={image} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="Musify" />
            <meta property="og:description" content={description} />
            <meta property="fb:app_id" content="874150923308251" />
        </Helmet>
    );
}