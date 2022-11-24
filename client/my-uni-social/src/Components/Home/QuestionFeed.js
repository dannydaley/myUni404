import QuestionCard from "./QuestionCard";

const QuestionFeed = () => {
    return(
        <div style={{padding: '20px', margin: '0 auto'}}>
        {/* Map of questions passing in variables */}
        <QuestionCard posterProfilePicture={'null'} poster={'Danny Daley'} title={'Is this code correct?'} question={'My Docker compose isnt working properly, this is the code: fnsdjnvjsdfnjknsdjk'} code={`function createStyleObject(classNames, style) {
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
  `} number={1} replies={10} date={'23/11/2022'}/>
        <QuestionCard posterProfilePicture={'null'} poster={'Danny Daley'} title={'Is this code correct?'} question={'My Docker compose isnt working properly, this is the code: fnsdjnvjsdfnjknsdjk'} number={1} replies={10} date={'23/11/2022'}/>
        <QuestionCard posterProfilePicture={'null'} poster={'Danny Daley'} title={'Is this code correct?'} question={'My Docker compose isnt working properly, this is the code: fnsdjnvjsdfnjknsdjk'} number={1} replies={10} date={'23/11/2022'}/>
        <QuestionCard posterProfilePicture={'null'} poster={'Danny Daley'} title={'Is this code correct?'} question={'My Docker compose isnt working properly, this is the code: fnsdjnvjsdfnjknsdjk'} number={1} replies={10} date={'23/11/2022'}/>
    </div>
    )
}

export default QuestionFeed;