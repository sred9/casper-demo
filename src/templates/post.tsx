import { format } from 'date-fns';
import { graphql, Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import * as _ from 'lodash';
import { lighten, setLightness } from 'polished';
import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { Footer } from '../components/Footer';
import SiteNav, { SiteNavMain } from '../components/header/SiteNav';
import PostContent from '../components/PostContent';
import { ReadNext } from '../components/ReadNext';
import { Subscribe } from '../components/subscribe/Subscribe';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, SiteMain } from '../styles/shared';
import config from '../website-config';
import { AuthorList } from '../components/AuthorList';


import { Facebook, Twitter, Reddit } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'


export interface Author {
  id: string;
  bio: string;
  avatar: {
    children: Array<{
      fluid: FluidObject;
    }>;
  };
}

interface PageTemplateProps {
  pathContext: {
    slug: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    markdownRemark: {
      html: string;
      htmlAst: any;
      excerpt: string;
      timeToRead: string;
      frontmatter: {
        title: string;
        date: string;
        userDate: string;
        image: {
          childImageSharp: {
            fluid: any;
          };
        };
        excerpt: string;
        tags: string[];
        author: Author[];
      };
    };
    relatedPosts: {
      totalCount: number;
      edges: Array<{
        node: {
          timeToRead: number;
          frontmatter: {
            title: string;
            date: string;
          };
          fields: {
            slug: string;
          };
        };
      }>;
    };
  };
  pageContext: {
    prev: PageContext;
    next: PageContext;
  };
}

export interface PageContext {
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    excerpt: string;
    title: string;
    date: string;
    draft?: boolean;
    tags: string[];
    author: Author[];
  };
}

const PageTemplate: React.FC<PageTemplateProps> = props => {
  const post = props.data.markdownRemark;
  let width = '';
  let height = '';
  if (post.frontmatter.image && post.frontmatter.image.childImageSharp) {
    width = post.frontmatter.image.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0];
    height = String(Number(width) / post.frontmatter.image.childImageSharp.fluid.aspectRatio);
  }

  const date = new Date(post.frontmatter.date);
  // 2018-08-20
  const datetime = format(date, 'yyyy-MM-dd');
  // 20 AUG 2018
  const displayDatetime = format(date, 'dd LLL yyyy');

  return (
    <IndexLayout className="post-template">
      <Helmet>
        <html lang={config.lang} />
        <title>{post.frontmatter.title}</title>

        <meta name="description" content={post.excerpt} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
          <meta
            property="og:image"
            content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
          />
        )}
        <meta property="article:published_time" content={post.frontmatter.date} />
        {/* not sure if modified time possible */}
        {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
        {post.frontmatter.tags && (
          <meta property="article:tag" content={post.frontmatter.tags[0]} />
        )}

        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.facebook && <meta property="article:author" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.frontmatter.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
        {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
          <meta
            name="twitter:image"
            content={`${config.siteUrl}${post.frontmatter.image.childImageSharp.fluid.src}`}
          />
        )}
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={post.frontmatter.author.id} />
        <meta name="twitter:label2" content="Filed under" />
        {post.frontmatter.tags && <meta name="twitter:data2" content={post.frontmatter.tags[0]} />}
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {config.twitter && (
          <meta
            name="twitter:creator"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        {width && <meta property="og:image:width" content={width} />}
        {height && <meta property="og:image:height" content={height} />}
      </Helmet>
      <Wrapper css={PostTemplate}>
		<header className="site-header">
          <div css={[outer, SiteNavMain]}>
           
         
            <div css={inner}>
              <SiteNav isPost post={post.frontmatter} />
            </div>
            
         
          </div>
        </header>
		
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
           
          
      
         
          <div css={inner}>
            {/* TODO: no-image css tag? */}
          
          
          <div className="row">
        
        <div className="col-md-1 col-xs-12">
       
        <div className="social-share">
      <Facebook url={config.siteUrl + props.pathContext.slug} />
      <Twitter url={post.frontmatter.title} shareText={post.frontmatter.title} />
      <Reddit url={config.siteUrl + props.pathContext.slug} />
    </div>
       
        </div>
        
        
        
          <div className="col-md-11 col-xs-12">
            <article css={[PostFull, !post.frontmatter.image && NoImage]}>
              <PostFullHeader className="post-full-header">
                <PostFullTags className="post-full-tags ">
                  {/*post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <Link className={post.frontmatter.tags[0]} to={`/tags/${_.kebabCase(post.frontmatter.tags[0])}/`}>
                      {post.frontmatter.tags[0]}
                    </Link>
                  )*/}
                        {/* <span className="bull">&nbsp;&bull;&nbsp;</span>*/}
                         <div className="byline-meta-content">
                        <time className="byline-meta-date" dateTime={datetime}>
                          {displayDatetime}
                        </time>
                        
                      </div>
                </PostFullTags>
                <PostFullTitle className="post-full-title">{post.frontmatter.title}</PostFullTitle>
                <PostFullCustomExcerpt className="post-full-custom-excerpt">
                  {post.frontmatter.excerpt}
                </PostFullCustomExcerpt>
                <PostFullByline className="post-full-byline">
                  <section className="post-full-byline-content">
                    <AuthorList authors={post.frontmatter.author} tooltip="large" />
                    <section className="post-full-byline-meta">
                      <h4 className="author-name">
                        {post.frontmatter.author.map(author => (
                          <Link key={author.id} to={`/author/${_.kebabCase(author.id)}/`}>
                            {author.id}
                          </Link>
                        ))}
                      </h4>
                          
                    {/*  <div className="byline-meta-content">
                        <time className="byline-meta-date" dateTime={datetime}>
                          {displayDatetime}
                        </time>
                        <span className="byline-reading-time">
                          <span className="bull">&bull;</span> 20 min
                        </span>
                      </div>*/}
                    </section>
                  </section>
                </PostFullByline>
              </PostFullHeader>

          
              {post.frontmatter.image && post.frontmatter.image.childImageSharp && (
                <PostFullImage>
                  <Img
                    style={{ height: '100%' }}
                    fluid={post.frontmatter.image.childImageSharp.fluid}
                    alt={post.frontmatter.title}
                  />
                </PostFullImage>
              )}
<div className="">

<div className="row">

<div className="col-xs-12 col-md-9">
<div className="post-main-content">
              
              <PostContent htmlAst={post.htmlAst} />
            <p className="post-footer-content">  —{post.frontmatter.author.map(author => (
                          <Link key={author.id} to={`/author/${_.kebabCase(author.id)}/`}>
                            {author.id} 
                          </Link>
                        ))}&nbsp;posted to&nbsp;{post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <Link className={"tag-link-logo_footer "+post.frontmatter.tags[0]} to={`/tags/${_.kebabCase(post.frontmatter.tags[0])}/`}>
                      {post.frontmatter.tags[0]}
                    </Link>
                  )}
                  </p>
                      
            </div>
                </div>
               

           <div className="col-xs-12 col-md-3">
                
                <div className="post-sidebar__right"> {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    
				
				
					
					<Link className={"tag-link-logo_sidebar " + post.frontmatter.tags[0]} to={`/tags/${_.kebabCase(post.frontmatter.tags[0])}/`}>
                      {post.frontmatter.tags[0]}
                    </Link>
					
                  )}

                <p>yo mama 2</p>
				
				
                ```toc
# This code block gets replaced with the TOC
exclude: Table of Contents
tight: false,
from-heading: 2
to-heading: 6
```         </div>
            </div>

            </div>


</div>
              {/* The big email subscribe modal content */}
              {config.showSubscribe && <Subscribe title={config.title} />}
            </article>
          
          </div>
          </div>
          
          
          </div>
      
  
        
        </main>

        <ReadNext
          tags={post.frontmatter.tags}
          relatedPosts={props.data.relatedPosts}
          pageContext={props.pageContext}
        />

        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

const PostTemplate = css`
  .site-main {
    margin-top: 34px;
    background: #fff;
    padding-bottom: 4vw;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

export const PostFull = css`
  position: relative;
  z-index: 50;
`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`;

export const PostFullHeader = styled.header`
  position: relative;
  margin: 0 auto;
  padding: 70px 0px 50px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (max-width: 1170px) {
    padding: 60px 11vw 50px;
  }

  @media (max-width: 800px) {
    padding-right: 5vw;
    padding-left: 5vw;
  }

  @media (max-width: 500px) {
    padding: 20px 0 35px;
  }
  @media (min-width: 320px) and (max-width: 480px) {
	padding: 3.75rem 0 35px;
  
}
@media (min-width: 481px) and (max-width: 767px) {
 
  padding: 3.75rem 0 35px;

}
`;

const PostFullTags = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* color: var(--midgrey); */
  color: ${colors.midgrey};
  font-size: 1.3rem;
  line-height: 1.4em;
  font-weight: 600;
  text-transform: uppercase;
`;

const PostFullCustomExcerpt = styled.p`
  margin: 13px 0 0;
  color: var(--midgrey);
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 2.3rem;
  line-height: 1.4em;
  font-weight: 300;

  @media (max-width: 500px) {
    font-size: 1.9rem;
    line-height: 1.5em;
  }

  @media (prefers-color-scheme: dark) {
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
  }
`;

const PostFullByline = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 32px 0 0;
  padding-top: 15px;
  /* border-top: 1px solid color(var(--lightgrey) l(+10%)); */
  border-top: 1px solid ${lighten('0.1', colors.lightgrey)};
	
	@media (min-width: 481px) and (max-width: 767px) {
 
	margin: 24px 0 0;

}



@media (min-width: 320px) and (max-width: 480px) {
	margin: 24px 0 0;
  
}
	
	
	
	
	
  .post-full-byline-content {
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
  }

  .post-full-byline-content .author-list {
    justify-content: flex-start;
    padding: 0 12px 0 0;
  }

  .post-full-byline-meta {
    margin: 2px 0 0;
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
    font-size: 1.2rem;
    line-height: 1.2em;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .post-full-byline-meta h4 {
    margin: 0 0 3px;
    font-size: 1.3rem;
    line-height: 1.4em;
    font-weight: 600;
  }

  .post-full-byline-meta h4 a {
    /* color: color(var(--darkgrey) l(+10%)); */
    color: ${lighten('0.1', colors.darkgrey)};
  }

  .post-full-byline-meta h4 a:hover {
    /* color: var(--darkgrey); */
    color: ${colors.darkgrey};
  }

  .post-full-byline-meta .bull {
    display: inline-block;
    margin: 0 4px;
    opacity: 0.6;
  }

  @media (prefers-color-scheme: dark) {
    /* border-top-color: color(var(--darkmode) l(+15%)); */
    border-top-color: ${lighten('0.15', colors.darkmode)};

    .post-full-byline-meta h4 a {
      color: rgba(255, 255, 255, 0.75);
    }

    .post-full-byline-meta h4 a:hover {
      color: #fff;
    }
  }
`;

export const PostFullTitle = styled.h1`
  margin: 0 0 0.2em;
  color: ${setLightness('0.05', colors.darkgrey)};
  @media (max-width: 500px) {
    margin-top: 0.2em;
    font-size: 3.3rem;
  }

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.95);
  }
  @media (min-width: 320px) and (max-width: 480px) {
  margin-top: 0;
}
@media (min-width: 481px) and (max-width: 767px) {
margin-top: 0;
}
`;

const PostFullImage = styled.figure`
  margin: 25px 0 50px;
  height: 800px;
  background: ${colors.lightgrey} center center;
  background-size: cover;
  border-radius: 5px;

  @media (max-width: 1170px) {
    margin: 25px -6vw 50px;
    border-radius: 0;
    img {
      max-width: 1170px;
    }
  }

  @media (max-width: 800px) {
    height: 400px;
  }
  @media (max-width: 500px) {
    margin-bottom: 4vw;
    height: 350px;
  }
`;


export const query = graphql`
  query($slug: String, $primaryTag: String) {
    logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt
      timeToRead
      frontmatter {
        title
        userDate: date(formatString: "D MMMM YYYY")
        date
        tags
        excerpt
        image {
          childImageSharp {
            fluid(maxWidth: 3720) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        author {
          id
          bio
          avatar {
            children {
              ... on ImageSharp {
                fluid(quality: 100, srcSetBreakpoints: [40, 80, 120]) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$primaryTag] }, draft: { ne: true } } }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default PageTemplate;
