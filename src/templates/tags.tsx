import { graphql } from 'gatsby';
import React from 'react';
import { FluidObject } from 'gatsby-image';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostCard } from '../components/PostCard_NoImage';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  PostFeed,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
  SiteNavMain,
  SiteArchiveHeader,
  NoImage,
} from '../styles/shared';
import { PageContext } from './post';
import { Helmet } from 'react-helmet';
import config from '../website-config';

interface TagTemplateProps {
  pathContext: {
    slug: string;
  };
  pageContext: {
    tag: string;
  };
  data: {
    allTagYaml: {
      edges: Array<{
        node: {
          id: string;
          description: string;
		 
          image?: {
            childImageSharp: {
              fluid: FluidObject;
            };
          };
        };
      }>;
    };
    allMarkdownRemark: {
      totalCount: number;
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const Tags: React.FC<TagTemplateProps> = props => {
  const tag = props.pageContext.tag ? props.pageContext.tag : '';
  const { edges, totalCount } = props.data.allMarkdownRemark;
  const tagData = props.data.allTagYaml.edges.find(
    n => n.node.id.toLowerCase() === tag.toLowerCase(),
  );

  return (
    <IndexLayout>
      <Helmet>
        <html lang={config.lang} />
        <title>
          {tag} - {config.title}
        </title>
        <meta
          name="description"
          content={tagData?.node ? tagData.node.description : ''}
        />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${tag} - ${config.title}`} />
        <meta property="og:url" content={config.siteUrl + props.pathContext.slug} />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${tag} - ${config.title}`} />
        <meta name="twitter:url" content={config.siteUrl + props.pathContext.slug} />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
      </Helmet>
      <Wrapper css={NoImage}>
        <header
          className={`site-tags-header site-archive-header ${tagData?.node?.image ? '' : 'no-image'}`}
          css={[SiteHeader, SiteArchiveHeader]}
        >
		
		
		
          <div className="sitenavmain-tags" css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>
          <div css={outer} className={`tags-header-background site-header-background ${tagData?.node?.image ? '' : 'no-image'}`}>
            <SiteHeaderContent css={inner} className="tag-header site-header-content">
				

                
			
					
<div className="tag-header-content">				
              <SiteTitle className="tag-title site-title">{tag}</SiteTitle>
			 
              <SiteDescription className="tag-description site-description">
                {tagData?.node.description ? (
                  tagData.node.description
                ) : (
                  <>
                    A collection of {totalCount > 1 && `${totalCount} posts`}
                    {totalCount === 1 && '1 post'}
                    {totalCount === 0 && 'No posts'}
                  </>
                )}
              </SiteDescription>
			
			  
			  </div>
            </SiteHeaderContent>
          </div>
        </header>
		
		
		<div className="author-wrapper_posts row">
         <div className="col-md-9">
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed]}>
              {edges.map(({ node }) => (
                <PostCard key={node.fields.slug} post={node} />
              ))}
            </div>
          </div>
        </main>
		
		</div>
		
		<div className="col-md-3">
		
		
		
		
		
		
		
		
		<div className="author-sidebar_right">

<div className="author-card_summary">

<span className="author-follow-wrapper author-social-link css-tjm2wc-AuthorSocialLink e3kfhi10"><a className="author-follow-button" href="https://twitter.com/TryGhost" target="_blank" rel="noopener noreferrer">Write for us</a></span>

<div class="tag-list">
<a className="tag-button">CSS</a>
<a className="tag-button">CSS</a>
<a className="tag-button">CSS</a>
<a className="tag-button">CSS</a>
 </div> 

</div>
</div>
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		</div>
		
		</div>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allTagYaml {
      edges {
        node {
          id
          description
          image {
            childImageSharp {
              fluid(maxWidth: 3720) {
                ...GatsbyImageSharpFluid
              }
            }
          }
		  
		  
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            image {
              childImageSharp {
                fluid(maxWidth: 1240) {
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
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;

