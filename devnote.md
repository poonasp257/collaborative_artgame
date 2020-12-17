# Development Note
 사람들이 고민을 나타내는 삼각형 모양의 아이콘 혹은 해당하는 아이콘이 없다면 포스트잇을 작성하여 게시판에 붙이면
 다른 사람들이 원형 모양의 아이콘을 그 위에 붙이는 것으로 고민을 게시한 사람에게 공감 혹은 해결책을 제시하는 방식으로 진행되는 게임이다.

 Unity, Unreal 등의 Engine을 활용하여 개발할 수도 있었으나 그럴 경우 유저와 규정 간의 상호작용이 필요하기 때문에 서버 역시 개발할 필요가 생겼다.
간단한 게임 방식에 비해 클라이언트 파트과 서버 파트 모두 C# 혹은 C++ 등과 같은 언어로 개발한다면 개발 기간이 길어질 것으로 판단되어 스크립트 언어인 Javascript로 Web 기반의 게임을 제작하게 됐다. 또한, 게임 방식이 SNS처럼 가볍게 PC, 모바일 플랫폼과 관계없이 웹 브라우저를 통해 언제 어디서든 접근할 수 있다는 점에서 채택하게 됐다.

 게임을 구현하기에 앞서 필요한 것들을 요약하자면 다음과 같다.  
**1. Web을 기반으로 제작한다.**  
```-> Markup Language인 HTML을 기반으로 제작해야 한다.```  
**2. 사용자와 사용자 간의 실시간적인 상호작용이 있다.**  
```-> Back End 개발이 필요하다.```  
**3. 모든 사용자는 익명으로 활동하나, 자신이 작성한 포스트잇만 편집, 삭제할 수 있어야 한다.**  
```-> 회원가입 및 로그인을 통해 사용자를 구분할 수 있다. ```  
**4. 유저가 붙인 포스트잇 혹은 아이콘들은 서버에 저장되고 서버가 재시작되어도 전과 동일한 정보를 가지고 있어야 한다.**  
```-> Database가 필요하다. ```  
 
## FrontEnd
### Beginning
 Web 프로그래밍은 대학교 1학년 때 한 학기에 거쳐 잠시나마 배웠던 경험이 있다. 그마저도 HTML과 CSS라는 것을 이용해서 간단한 브라우저를 만들어보는 것밖에 해보지 못했다. 대학교에 들어와 처음 프로그래밍을 접했던 나에겐 C언어 배우기에도 벅찼기에 Web 언어를 제대로 공부해보지 못했다.
따라서, 개발을 시작할 때 Web 언어에 대한 기초를 다지는 것이 최우선 과제였다. 생활 코딩이라는 사이트가 상당히 큰 도움이 됐다. 프로그래밍을 모르는 일반인도 쉽게 입문할 수 있을 정도로 쉽게 배울 수 있었다. 그러다 보니 HTML과 CSS만으로는 개발할 수 없고 Javascript라는 스크립트 언어를 이용해야 한다는 것을 깨달았다. jQuery, Vue.js, Angular.js 등 Javascript 라이브러리를 이용할 수도 있었으나 javascript로만 만들어보고 어떤 라이브러리를 사용해야 할지 결정하는 게 맞다고 생각되어 vanila javascript로 개발을 진행했다. 

### Start from scratch
![image4](https://user-images.githubusercontent.com/39629336/71548113-fce35900-29ec-11ea-9951-7e8a7195db08.JPG)  
![image5](https://user-images.githubusercontent.com/39629336/71548167-ad515d00-29ed-11ea-809c-bc30eeb65bd3.JPG)

 개발하면서 배우기도 쉽고 언어적으로 편리하다고 느낀 부분이 많아 javascript란 언어가 상당히 매력적으로 느껴졌다. 다만, 자료형을 따로 선언하지 않아도 된다는 점에서 편리하다고 느꼈지만 가끔 모호하다고도 느꼈다. 
```  
# in C++  
int a = 10;  
# in Javascript  
var a = 10;  
// var a = 'Hell world';  
```

### Vanila Javascript ? React.js!!
 vanila javascript는 처음부터 필요로 하는 모든 기능을 직접 구현해야 했기 때문에 이후부터는 라이브러리를 사용하기로 했다. 많은 라이브러리 중에서도 Facebook과 몇몇 개발자들이 모여 만든 라이브러리인 React.js를 선택했다. 라이브러리를 선택하는데 중점으로 본 것은 **'javascript 언어의 문법과 유사한가?'** 였다. React.js는 그런 내 요구사항에 가장 부합했다. 또한, Virtual DOM이라는 개념을 사용하여 렌더링하기 때문에 변화가 있는 부분만 렌더링을 하므로 성능적 이점도 있다고 한다. 실제로 이에 대한 부분을 직접적으로 체감하기는 어려웠다...

 아래는 갈등, 해결 아이콘과 포스트잇을 선택할 수 있는 Toolkit Component의 React.js 코드이다.
```
...
render() { 
    return (
        <Container isOpened={this.state.isOpened}>
            <Button onClick={this.handleMenu}>
                <Icon type="brush" size="24px"/>
            </Button>
            <Content>
                <Box>
                    <Name>Toolkit</Name>
                    <ItemList category="conflict" Item={Symbol} tag="symbol" targetTag="board" size={45}/>
                    <ItemList category="resolution" Item={Symbol} tag="symbol" targetTag="board" size={40}/>
                    <ItemList category="post" Item={Post} tag="post" targetTag="board" size={45}/>
                </Box>
            </Content>
        </Container>
    );
};
...
```
 HTML의 태그와 상당히 유사한 형태로 보이지만 HTML도 문자열도 아닌 JSX라는 javascript의 문법을 확장한 것이다. 그 외에도 javascript의 문법을 그대로 사용할 수 있었기 때문에 빠르게 개발할 수 있었다. 또한, React에서는 Component라는 것으로 DOM을 구성하는데 이것은 객체지향의 개념인 추상화를 제공해서 추상화의 장점도 가져올 수 있었다.

 장점들만 나열해서 완벽한 라이브러리인가 싶지만, React는 기본적으로 단방향의 흐름 구조로 되어 있다. React 역시 내부적으로 DOM을 사용하는데
div와 같은 요소들로 이루어진 트리 구조이다. 이 요소들을 Node라고 하며 최상위 Root Node를 기준으로 트리 구조를 띄기 때문에 부모 Node는 자식 Node들을 감싸는 형태이다. 각 Node 간의 데이터 전달이 필요한 경우가 있는데 이러한 구조 때문에 부모 Node에서 자식 Node로의 데이터 전달은
가능하나, 자식 Node에서 부모로 혹은 자식 Node 간의 데이터 전달은 불가능하다. 그래서 개발을 하다가 이러한 경우가 상당히 많이 발생했고 최대한 다른 방법으로 구현하려고 했으나, 필요한 경우가 분명히 있었다. 그러다가 찾은 해결책은 Redux 라는 라이브러리이다. React는 앞서 언급했듯
단방향 흐름 구조인데, 이는 양방향 데이터 흐름 구조인 MVC 구조와 대조되는 Flux 구조로 만들어져있다. 이 Flux 구조를 좀 더 잘 활용하기 위한 라이브러리이다. 요약하자면, 하나의 Store를 두고 Component는 Action을 통해 Store의 State를 업데이트시키고 다른 Component는 Store를 관찰하다가 Store의 State가 변화된 것을 확인하고 그것에 맞게 자신의 State를 변화시킨다는 것이다. Redux 을 도입하면서 자칫 스파게티 코드로 이어질 수 있었던 상황을 피할 수 있었다. 

### CSS File? N...No... Styled Component!!
 React도 결국 HTML을 사용하기 때문에 Style을 주기 위해서는 CSS를 써야 한다. CSS 코드를 따로 파일로 분리하여 사용하는 것이 일반적인데 CSS 문법 자체가 className 혹은 id 등의 값으로 하나 혹은 그 이상의 그룹으로 Style을 주는데 div와 같은 요소들이 많아지면 많아질수록 각 요소를 구분 짓기 어려워지는 것은 물론이고 CSS 코드가 길어지며 파일도 많아져 결과적으로 해당 요소가 어떤 Style 값을 갖는지 확인하기 어려워진다. 그래서 이러한 문제를 해결하고자 개발된 것이 Styled Component라는 라이브러리이다. 기본적으로 React.js 기반으로 만들어졌다.
 ```
const Button = styled.div`
   float: left;
   padding: 3px 4px 3px 5px;
   border-radius: 30px 0px 0px 30px; 
   cursor: pointer;
   color: #fefae7;
   background-color: #e83c18;
   :hover {
       color: #e83c18;
       background-color: #fefae7;;
   }
`;
...
<Button onClick={this.handleMenu}>
  <Icon type="brush" size="24px"/>
</Button>
```
 해당 요소에 Style을 주고 이를 Component로 만들어서 사용하기 때문에 각각의 파일에 별도로 만들 수 있고 요소가 어떤 Style 값을 가졌는지 확인하기 훨씬 수월했다. 
 
 
## BackEnd
### Beginning 
Vanila javascript로 클라이언트 사이드를 어느정도 구현 하고 나서 서버 사이드를 구현하고자 했다. front end와 back end 모두 혼자 개발을 해야 했기 때문에 최대한 학습 시간보단 개발하는 것에 시간을 투자하고 싶었다. 서버 사이드 언어로 PHP, ASP, JSP, Python, Ruby 등 다양한 언어의 선택지가 있었지만 앞서 말한 이유로 적어도 front end와 back end의 언어를 일치시키고 싶었다. 그래서 javascript를 기반으로 하는 Node.js를 서버 사이드 언어로 선택하게 됐다.

 Node.js는 기본적으로 단일 스레드의 이벤트 루프와 Non-blocking IO를 지원하기 때문에 개발하고자 하는 게임에는 충분히 강력한 플랫폼이었다.
멀티 스레드 환경에서 발생할 수 있는 문제를 배제하고 개발할 수 있었기 때문에 편했다. 또한, 몇 줄 안 되는 코드로 서버를 구동하여 직접 브라우저상에서 확인할 수 있어서 상당히 신선한 충격을 받기도 했다.

### Vanila...? Library...?
 Node.js로도 충분히 구현할 수 있지만 Express.js를 활용하면 API를 좀 더 단순화시킬 수 있을 뿐만 아니라 많은 기능을 사용할 수 있기 때문에 Express 웹 프레임워크를 사용하기로 했다. Express의 뜻대로 빠르고(?) 상당히 기존의 작업을 단순화시킬 수 있었다.

 어떤 개발자들은 많은 javascript 개발자들이 Module과 Library에 너무 의존적이라는 말을 한다. 그도 그럴 것이 개발을 하다 보면 내가 필요한 기능이 있을 때 직접 구현하고자 하면 원하는 기능을 구현한다 한들 예측할 수 없는 개발 시간과 수많은 예외처리의 늪에 빠지게 된다. 그래서 다른 사람이 구현한 라이브러리들을 찾아보게 되는데 정말 이런 건 없겠지 해서 찾아보면 진짜로 있다. 놀라울 정도로 다양하고 훌륭한 라이브러리들이 있기 때문에 정말 필요한 기능이 없다거나 성능 최적화에 민감한 상황이 아니라면 먼 길을 찾아가기보다는 가까운 길을 선택하는 것도 나쁘지 않다고 생각한다. 사실 앞서 말한 개발자들의 말에 공감하기도 한다. 웹 분야뿐만 아니라 게임 분야에서도 Unity와 Unreal 엔진이 게임 시장을 독점하다시피 하는 상황에서 Low-level api인 DirectX나 OpenGL를 굳이 배워야 하나요? 라는 질문을 하는 사람들이 있다. 결국 Unity와 Unreal 모두 low level api를 기반으로 만들어졌기 때문에 동작 원리를 이해해야 프로그래머가 아닐까? 하고 생각한다. 상용 엔진을 이용해 게임 개발을 하는 건 사실 프로그래머가 아닌 디자이너는 물론이고 누구나 할 수 있다. 주어진 API를 이용해 코딩한다면 프로그래머가 아닌 그저 코더에 지나지 않는다고 생각한다. 물론 나 역시도 매번 완벽하게 이해하고 쓰고 있는 거 맞아? 라고 나 자신에게 물어보고 반성하게 되는 것 같다. 
 
### Real time interaction
 단순한 웹 서비스를 제공하는 웹 페이지를 개발하는 게 아니라 게임을 개발하는 것이었기 때문에 실시간으로 유저 간의 상호작용이 핵심적이라고 생각했다. 개발 초기에는 AJAX를 주고받는 REST API만으로 로그인, 회원가입, 인게임 모두 처리했었다. 로그인과 회원가입 같은 경우에는 서버와 클라이언트의 1:1 상호작용이므로 REST 방식으로도 충분했으나 인게임에서 아이콘을 붙이고 포스트잇을 작성하는 행동은 자신을 제외한 다른 유저에게도 동시에 보여줘야 하므로 REST 방식으로는 이를 충족시킬 수 없었다. 물론 새로 고침을 통해서 새로운 아이콘이나 포스트잇의 정보를 불러오는 방법을 택할 수도 있었으나 앞서 말했듯 그럴 경우 게임이라기보다는 커뮤니티? 혹은 SNS와 다를 바가 없다고 생각되어 Web Socket을 채택하게 됐다. REST 방식이 클라이언트가 서버에 요청하면 서버가 그에 응답하는 방식이라면, Web Socket은 서버가 클라이언트에게 요청하기도 할 수 있는 양방향 통신이 가능토록 하는 방식이다. 
 
**********************************
# To do List
1. 현재는 팝업창 형식으로 Alert와 Confirm 메시지 박스만 구현했다. 단순히 지울 수 있거나 천천히 사라지는 알림 형식의 메시지를 띄울 수 있도록 해야 한다. ex) 로그인, 회원가입의 성공 메시지
2. 인게임 내에서 REST 방식과 Web Socket 방식을 혼용하고 있는 부분...수정해야 함
3. 아이콘이나 포스트잇을 드래깅할 때 원본 이미지 사이즈와 드래깅 상태의 사이즈, 그리고 붙였을 때 사이즈를 사용자 환경에 맞게 수정해야함
또한, 그 외의 컴포넌트들 역시 현재는 눈대중으로 맞췄으므로 해상도 대응 할 수 있도록 수정해야 함.
4. 아이디 찾기, 비밀번호 찾기 등이 필요할 것 같음. 만약 추가한다면, 회원가입 시 개인정보를 수집해야 할 수도 있을 듯
5. 본인이 작성한 포스트잇의 목록이라던가 어떤 해결책이 붙었는지 확인할 수 있는 공간이 따로 있었으면 좋겠음. 
6. 포스트잇에 타임아웃 시간을 설정하는 기능을 추가
7. 특정 개수의 아이콘들이 Board에 채워지면 모든 아이콘과 포스트잇이 하나의 상징을 이루도록 하는 알고리즘 추가
8. 전반적인 코드 리팩토링이 필요함.....