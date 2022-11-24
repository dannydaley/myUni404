import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import CodeBlock from '../CodeBlock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReplyIcon from '@mui/icons-material/Reply';
import CreateReply from './CreateReply'
import Answer from './Answer';


export default function FullQuestion(props) {
  return (
    <div style={{margin: '20px 0'}}>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <div src={props.posterProfilerPicture} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                    <img style={{border: '1px solid gray', width: '60px', height: '60px', borderRadius: '50%'}}/>
                    <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        {props.poster} 
                        poster name 
                    </Typography>
                    <CardActions sx={{marginLeft: 'auto'}}>
                    {/* <Button size="small">Read More</Button> */}
                      <div style={{marginLeft: 'auto', display: 'flex', flexDirection: 'row', verticalAlign: 'center'}}>
                          <VisibilityIcon sx={{color: 'gray'}}/>
                          <Typography color="text.secondary" >           
                              10
                          </Typography>
                      </div>
                      <ReplyIcon sx={{color: 'gray', paddingLeft: '5px'}}/>
                      <Typography color="text.secondary" sx={{paddingRight: '15px'}}>
                          {props.replies}
                          3
                      </Typography>
                    </CardActions>
                </div>
                <Typography variant="h5" component="div" sx={{mb: 2}}>
                    {props.title}
                    'Is this code correct?'
                </Typography>
                <Typography variant="body2" sx={{textAlign: 'left'}}>
                    {props.question}
                    'My Docker compose isnt working properly, this is the code: fnsdjnvjsdfnjknsdjk'
                    <CodeBlock codeString={ `function createStyleObject(classNames, style) {
                        return classNames.reduce((styleObject, className) => {
                          return {...styleObject, ...style[className]};
                        }, {});
                      }

                      function createClassNameString(classNames) {
                        return classNames.join(' ');
                      }

                      /* this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully
                      */
                      funtion createChildren(style, useInlineStyles) {
                        let childrenCount = 0;
                        return children => {
                          childrenCount += 1;
                          return children.map((child, i) => createElement({
                            node: child,
                            style,
                            useInlineStyles,
                            key:\`code-segment-\${childrenCount}-\${i}\`
                          }));
                        }
                      }

                      function createElement({ node, style, useInlineStyles, key }) {
                        const { properties, type, tagName, value } = node;
                        if (type === "text") {
                          return value;
                        } else if (tagName) {
                          const TagName = tagName;
                          const childrenCreator = createChildren(style, useInlineStyles);
                          const props = (
                            useInlineStyles
                            ? { style: createStyleObject(properties.className, style) }
                            : { className: createClassNameString(properties.className) }
                          );
                          const children = childrenCreator(node.children);
                          return <TagName key={key} {...props}>{children}</TagName>;
                        }
                      }
                        `} />
                </Typography>
            </CardContent>
        </Card>
        <Divider sx={{marginTop: '10px'}} />
        <Card>
          <Typography sx={{ fontSize: 18, mt: 2 }} color="text.secondary" gutterBottom>
            3 answers
          </Typography>
          <Answer />
          <Divider />
          <Answer />
        </Card>       
        <CreateReply />
    </div>
  );
}