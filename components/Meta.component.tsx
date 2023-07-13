import Head from "next/head";

export type IMetaTag = {
  title: string;
  description?: string;
  keywords?: string[];
  type?:
    | "website"
    | "article"
    | "blog"
    | "book"
    | "music.album"
    | "music.song"
    | "video.movie"
    | "video.episode"
    | "video.tv_show"
    | "place"
    | "product"
    | "event";
  url?: string;
  image?: string;
  siteName?: string;
  locale?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterSite?: string;
  twitterCreator?: string;
  viewport?: string;
};

export const Meta = ({
  title,
  description,
  keywords,
  type,
  url,
  viewport = "width=device-width, initial-scale=1.0",
  image,
  siteName,
  locale,
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterSite,
  twitterCreator,
}: IMetaTag) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} key="title" />

      {description && (
        <meta
          property="og:description"
          name="description"
          content={description}
        />
      )}

      {keywords && <meta name="keywords" content={keywords?.join(",")} />}

      {type && <meta property="og:type" name="type" content={type} />}

      {url && <meta property="og:url" name="url" content={url} />}

      {viewport && (
        <meta property="og:viewport" name="viewport" content={viewport} />
      )}

      {image && <meta property="og:image" name="image" content={image} />}

      {siteName && (
        <meta property="og:site_name" name="site_name" content={siteName} />
      )}

      {locale && <meta property="og:locale" name="locale" content={locale} />}

      {twitterCard && (
        <meta
          property="og:twitter:card"
          name="twitter:card"
          content={twitterCard}
        />
      )}
      {twitterTitle && (
        <meta
          property="og:twitter:title"
          name="twitter:title"
          content={twitterTitle}
        />
      )}
      {twitterDescription && (
        <meta
          property="og:twitter:description"
          name="twitter:description"
          content={twitterDescription}
        />
      )}
      {twitterImage && (
        <meta
          property="og:twitter:image"
          name="twitter:image"
          content={twitterImage}
        />
      )}
      {twitterSite && (
        <meta
          property="og:twitter:site"
          name="twitter:site"
          content={twitterSite}
        />
      )}
      {twitterCreator && (
        <meta
          property="og:twitter:creator"
          name="twitter:creator"
          content={twitterCreator}
        />
      )}
    </Head>
  );
};
