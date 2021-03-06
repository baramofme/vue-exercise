# 실손보험 청구 노트

실손보험 청구내역을 연결해서 기록 보관하는 기능을 제공함으로써, 보험 청구 절차 진행 시 관계자와 정보 비대칭 해소하여 
기억 못하고 잘 몰라 실수하는 답답한 사람에서 벗어나 보험사 청구 시 원활하고 떳떳한 소비자로 필요한 보험 청구에 에너지를
집중할 수 있게 도운다.

## 개요

다 쓰고 보니까. 한 페이지짜리 기획서네. 2-3 을 묶고 빈 5번에다가 후속행동을 적으면. 
[기획서 양식](https://brucemoon.net/1198142879)

1. **필요나 욕구** 

   `은행계좌 - 병원 및 약국 영수증 - 보험사 보상내역 정보`가 유기적으로 연결 되어서 보여지면 좋겠다.  

2. **필요나 욕구의 탄생** 

   보험사에게 받은 보상내역 서류에는 내가 어떤 것을 얼만큼 청구했고 그 중 얼마가 보상되었는지 나오지 않아서
   내가 누락한 것인지 보험사가 누락한 것인지 알 수가 없다.

3. **탄생 문맥** 

   DB 손해보험 실손보험 청구를 했고, 보험 설계사에게 팩스로 보낸 영수증 금액보다 매우 작은 금액이 입금됐다. 

4. **원하는 바**

   이 프로그램으로 영수증 내역을 입력하고, 내가 발송 및 접수한 내역, 보험사 접수 및 보상내역, 그리고 은행 계좌 실제 
   보상 내역을 모두 입력할 수 있다.
   
   보험 보상 내역을 클릭하면 하단에 내가 접수한 영수증의 묶음이 보이며, 그것들의 개별 보상 상태를 확인할 수 있다. 즉,
   이 보상의 상태를 한 눈에 파악할 수 있다.
   
   이렇게 함으로써, 나는 보험사와 이야기할 때 
   1. 내가 언제 보낸 어떤 영수증의 보상이, 보상번호 x 에서 누락되었다를 말할 수 있고
   2. 내가 어떤 영수증을 아직 접수하지 않았고, 어떤 영수증이 내 행동(영수증이나 소견서 발행)이 필요한 지 알 수 있고
   3. 보상 진행상태에 청구 반려 사유 등을 통해, 반려 이후 어떤 행동이 필요한 지 잊지 않고 기억할 수 있다.

5. **발생하길 기대하는 최종 효용** 
 
   결과적으로, 실손보험 청구내역을 연결해서 기록 보관하는 기능을 제공함으로써 
   1. 보험 청구 절차 진행 시 관계자와 정보 비대칭성을 해소하여 
   2. 기억 못하고 잘 몰라 실수하는 답답한 느낌에 소모되는 에너지를 줄이거나 없애서
   3. 보험사 청구 시 필요한 보험 청구에 에너지를 온전히 집중할 수 있게 도운다.
  
## 프로토타이핑

### 내용 구체화

위의 4번을 구체화

- 정보 입력
  - 구분
    - 영수증 내역 입력
    - 보험사 접수 및 보상 내역 입력
  - 속성
    - 은행 계좌와 금액
      - 계좌, 지출일, 건별 보상금액
      - 보상일 접수일 처리일
    - 영수증 내역
      - 병원, 총급여(비급여,급여), 질병코드, 입원/퇴원종류
    - 보험 내역
      - 청구대상 보험
      - 접수, 지급, 처리일자
      - 처리금액   

- 정보 보기
  - 구분
    - 영수증 별보기
       - 모든 영수증이 나열된다. 
         - 상태 미접수, 발송완료, 접수완료, 보상완료
    - 청구건 보기
       - 영수증 중 청구별 묶음으로 나열된다.
       - 청구되지 않은 것은 따로
       - 내가 접수(청구)한 날짜와 진행 상태, 그리고 필요한 후속 조치를 볼 수 있다.
    - 보상별 보기
       - 보상별로 묶어서 나열된다. 
       - 보상된 날짜, 접수 방법(팩스, 이메일, 홈페이지), 접수 상태 그리고 해당 보상에 해당하는 영수증을 보여준다.
       - 보험사 지급일과 금액의 목록, 그리고 영수증 총 청구 금액과 총 보상금액을 비교한다.
       
- 상태
   - 자료 준비 상태 : 신규, 미해당, 자료 미비, 자료 수집 중, 완료, 추가 자료 필요.
     - 필요 자료 목록, 자료 발급 일자, 자료 상태
   - 접수 방법 : 팩스, 이메일, 홈페이지, 어플.
     - 접수일자 
   - 접수 상태 : 발송, 대기, 접수 
     - 발송일, 대기일, 접수일 따로
   - 지급 상태 : 대기, 추가 자료 필요, 추가 자료 지급, 지급 완료.
     - 지급완료 일자
     - 무슨 추가자료가 필요한 지 목록, 추가자료 확보 상태

### 프로토 타이핑(기본 개발) 준비

ovenapp.io 같은 프로토 타이핑 툴로 먼저 기획을 만드는 게 좋다고 생각을 한다. 개발자 개고생 시키는 것보다는, 기획서를 
개고생 시켜서 최대한 시행착오를 줄이는 게 개발비용(지금 문맥에서는 내 인생)을 줄일 수 있으니까. 기획서는 한 쪽인데
그걸 구현하려면 몇 사람이 몇 개월간 작업해야하는 지 알 수 없다.

여튼, 근데 아 몰라. 어차피 개발 할 거면 미리 만들어 두자는 느낌으로 개발 기본 세팅을 했다. IDE 에서 로컬로 구축하는 게 
좋지만, 이건 프로토 타입이고, 장소에 구애받지 않고 수정하고 공유하기에는 온라인 IDE 가 좋다.

내가 익숙한 것과 이 프로젝트에서 필요한 것은 다음과 같다.

- 개발환경
  - 마크다운에 공유할 수 있고, 온라인으로 매번 IDE 설치 안하고 바로 사용하면 좋겠고 폴더/파일 구조 지원하면 좋겠다.
  - codesandbox
    - stackblitz 가 더 빠르고 좋았지만, `.vue` 싱글파일 지원을 안 한다.
- 화면
  - 익숙한 것으로 빨리 개발하기를 원한다.
  - 타입스크립트, 뷰.js, 뷰티파이, SCSS
  - 기본 모바일 레이아웃
- DB
  - 영수증과 보상내역간 관계 조회가 필요하며, 서버 안쓰고 로컬에서만 자바스크립트로 직접 쓰려고 한다.
  - 로컬 관계형 DB 러브필드
    - pouchDB 고려했으나 `no-sql` 에서 조인을 어떻게 하는 지를 생각하니 두려워서 안 하게 됐다.
- 몇 가지 예시
  - 로컬 스토리지 조회/저장/삭제
  - 러브필드(indexedDB 래퍼) 조회/저장/삭제

<embed src="https://codesandbox.io/embed/jvwmo587n9?autoresize=1&fontsize=14" width="100%" height="768px">

약간 구린 건, 2차 `<router-view />` 부터는 타입스크립트 모듈 인식을 못해서 그곳에 보여질 컴포넌트는 바닐라 vuejs 형식으로
작성을 해야한다. 이것때문에 고문당하는 느낌으로 "왜 안 돼?" 모드로 또 인생을 갈아넣었다.

### 데이터 구조 잡기

내가 임의로 정한 데이터 구조가 아니라, 가급적 공통으로 사용되는 데이터가 좋다.

국민건강보험에서 `진료받은 내용 조회` 하면 나오는 정보 먼저 보자.

```js
[
  {
    "번호": "42",
    "병·의원(약국)명칭": "고려대학교의과대학부속구로병원[구로구 구로동로]",
    "진료개시일": "2016.01.12",
    "진료형태": "일반외래",
    "처방회수": 1,
    "본인부담금": "19,300",
    "청구여부": false
  },
 ]
```

보험 청구 앱에서는 다음처럼 표현한다.

![](https://lh3.googleusercontent.com/NvVbY_nXALV8KzH1_3lMCWLo2mJQYuzQJ4yoq5deMwlouifnh-9An6KO5Ds_uUoFMTRlgIaMZoATKXpkZc5iYFOYTMekXyay1kfNFQ6MNzVFXFjkt3LiMIAV7s66r6rVwnTiXokjMpVmLa9tNxczm1zuJ_18QMq-25k86_QYT56F3LokaihaXfstOuHboMk531_ZP9S3-J-zCyaZ-GjWfXiMkaDKq9XkBrA9JpvffI9SbPmYaJw0s8NreFd25s3-H0AkCLmRiW-JNlB9uy4hDyZ-0VkcRMXpKoHX_imRbeDcnOkD3vcKnMizQd_NwGdxLkRFYxqDiumV99QNCKfGJZvj08XVEX4F5eV84T_vsq-bNQT_6nRyP3Yj5DnalEybMX4v_MwCEI_mcFRxxCFRaz5m-e81FFM2iwC-c9lpshx6MIL7bAOiigHfO-swemq3dERkGgFzEtXm9q2tZJ2qOn6GhLZNqU8ClVgn8z5MZiOGD2YabjgO2gXhKk43tPz1tc3SkAofWbZ54CnirOn9TniIAaCvnnNvPlYQUSTwGP4E261ql-sbSOZ3p5vintU9qh-A2tsFDrhKrh3N5pThq7QOFTggruwKkFoFaKfmof5fThuzkoMG4qieJJz9bWbl5uP4ur4cEk-SVpnzH_MwvpNfkZ9AcvQ=w852-h1515-no)

내 필요는 청구 여부 뿐 아니라, 접수 및 지급 여부 까지.

```js
[
  {
    "번호": "11",
    "병·의원(약국)명칭": "고려대학교의과대학부속구로병원[구로구 구로동로]",
    "진료개시일": "2016.01.12",
    "진료형태": "일반외래",
    "처방회수": 1,
    "본인부담금": "19,300",
    "청구": false,
    "접수": false,
    "지급": false,
  },
 ]
```

그럼 실제로 보험사 청구 접수 정보는 어떻게 할까? 요것도 이미 앱에 있다.

![](https://lh3.googleusercontent.com/sFb4etJ5hP9eChNZqgGW1nFkoA5z3QszhHPg1njViO04SVTUoVKNpLGPOfTkBB4TQriu4KcLUNxteihZd1LV2uR5Fp8yOAoEEx5LKkqB1gKiHbOswE7uXYANXMV6jPbhwLVnTIhYRnQlERiZMhGyKMkDHO0eX9lKYYvT2HZhQHKqcgQQQeUSJqlQzhEqKO7-BV3ieZomK7FuOAdUP4Xpf2cVxfL-_L2oJzZ_u4vxAz0lL0lR3F2y6rTif9_EJVB_F6om3ennQSBl97HJjL8u6lrw9f0SYQ2fHdXf8PHemsoaWAh2AnR0gmcgm_nQwD2t8R41hzoCWV9R7heqRhpk_DMdmgpAxb_6o9A50Gnnq_GnJDnNobI9sh_dLKUWzL8tVn0UaeGkZ0KYlEHUXN9SnZWpzLvSfqt8jvshUL5rNk-zWeP7tC4A3mm3507F7pYs1TZr2IRn-grxRzLmbPcfjqMHwAp8pW2CgmNqmNGreYjA1J_5gdzm2pKe8CbH3lztAbgHrxwFfJO_hrNT00rQzRNjjYWHxBmpr3iKPDxY4Db8r0Gq8zm0uhZ4AuXLXdxBlD0J0as67NctCAuP6ZeFQ8fow0kb8ejNgnxlGvB5sx3Q69R72jfvwwIdzAwFUgi6gCueSolSNWsE97njrDxI7zZ6-8Kr9iw=w893-h1587-no)

이것을 바꾸자면 다음과 같을 듯?

```js
[
  {
    "번호": "11",
    "사고유형": "질병", // 질병 || 상해
    "사고일자": "2016.01.12",
    "병원/약국명": "00약국",
    "다녀온 이유": '감기',
    "자동이체 계좌로 입금받기": "Yes", // Yes || No
    "청구인": "홍길동",
    "담당자": "000",
    "담당자 연락처": "000",
    "서류": ""
  },
 ]
```

보니까. 나는 한꺼번에 3~4개 씩 팩스로 접수한 뒤에 보험사 지급 내역은 딸랑 한 장 나오는 게 빡쳤는데, 
앱은 무조건 1 영수증 1 지급서다. 보험사쪽 서류가 무성의 하니 그걸 따질 빌미를 안 주고 1:! 매칭.

음, 나처럼 귀찮은 사람은 건건이 안하고 통으로 하는데, 음... 일단 앱에서는 통으로 몇 건씩 한꺼번에 접수하는 기능은 없다.

그럼 대세를 따르자. 보험사에 직접 요청한 서류조차 그날 접수한 개별 영수증 세부 보상 내역이 없었으니 그게 맞을 거 같음.

그리고 이렇게 하면, 애당초 말한 관계형 DB 가 필요 없다. 엑셀로 따지면 한 줄에 모든 정보가 다 들어가니 PouchDB 와 같은 NO-SQL 써도 됨.

음. 이 앱의 한계점이라면, 오늘부터 2개월 까지의 내역은 나오지 않고 따라서 접수도 불가능하다.

이건 보험사가 좋은 일. 나는 돈이 회전이 안 되는 거고.

따라서, 원래대로라면 국민건강보험 페이지에서 조회한 내역만 가져와야 하는 거지만, 유사한 형태의 내역을 입력할 수도 있어야 한다.
 
<div>
<v-app>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :expand="expand"
            item-key="번호"
    >
      <template v-slot:items="props">
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item["번호"] }}</td>
          <td class="text-xs-right">{{ props.item["청구여부"] }}</td>        
          <td class="text-xs-right">{{ props.item["병·의원(약국)명칭"] }}</td>
          <td class="text-xs-right">{{ props.item["진료개시일"] }}</td>
          <td class="text-xs-right">{{ props.item["진료형태"] }}</td>
          <td class="text-xs-right">{{ props.item["처방회수"] }}</td>
          <td class="text-xs-right">{{ props.item["본인부담금"] }}</td>
        </tr>
        </template>
       <template v-slot:expand="props">
                    <td class="text-xs-right">{{ props.item["번호"] }}</td>        
                    <td class="text-xs-right">{{ props.item["사고유형"] }}</td>
                    <td class="text-xs-right">{{ props.item["사고일자"] }}</td>
                    <td class="text-xs-right">{{ props.item["병원/약국명"] }}</td>
                    <td class="text-xs-right">{{ props.item["다녀온 이유"] }}</td>
                    <td class="text-xs-right">{{ props.item["담당자"] }}</td>
       </template>
    </v-data-table>
</v-app>
</div>

<v-style>
.application--wrap{
    min-height: auto;
}
</v-style>

```js {mixin:true}
{
    data () {
      return {
      expand: false,
        headers: [
          {
            text: '번호',
            align: 'left',
            sortable: false,
            value: '번호'
          },
          { text: '청구여부', value: '청구여부' },
          { text: "병·의원(약국)명칭", value: "병·의원(약국)명칭" },
          { text: '진료개시일', value: '진료개시일' },
          { text: '진료형태', value: '진료형태' },
          { text: '처방회수', value: '처방회수' },
          { text: '본인부담금', value: '본인부담금' },
         
        ],
        desserts: [
                   {
                     "번호": "42",
                     "병·의원(약국)명칭": "고려대학교의과대학부속구로병원[구로구 구로동로]",
                     "진료개시일": "2016.01.10",
                     "진료형태": "일반외래",
                     "처방회수": 1,
                     "본인부담금": "19,300",
                     "청구여부": false,
                         "번호": "11",
                         "사고유형": "질병", // 질병 || 상해
                         "사고일자": "2016.01.12",
                         "병원/약국명": "00약국",
                         "다녀온 이유": '감기',
                         "자동이체 계좌로 입금받기": "Yes", // Yes || No
                         "청구인": "홍길동",
                         "담당자": "000",
                         "담당자 연락처": "000",
                         "서류": ""
                   },
     
                   {
                     "번호": "41",
                     "병·의원(약국)명칭": "후문약국[구로구 가마산로]",
                     "진료개시일": "2016.01.11",
                     "진료형태": "처방조제",
                     "처방회수": 1,
                     "본인부담금": "69,000",
                     "청구여부": false
                   },
                   {
                     "번호": "40",
                     "병·의원(약국)명칭": "바른병원[영등포구 여의대방로]",
                     "진료개시일": "2016.01.12",
                     "진료형태": "일반외래",
                     "처방회수": 0,
                     "본인부담금": "3,700",
                     "청구여부": false
                   },
                   {
                     "번호": "39",
                     "병·의원(약국)명칭": "고려대학교의과대학부속구로병원[구로구 구로동로]",
                     "진료개시일": "2016.01.11",
                     "진료형태": "일반입원",
                     "처방회수": 0,
                     "본인부담금": "88,830",
                     "청구여부": false
                   },
                   {
                     "번호": "38",
                     "병·의원(약국)명칭": "바른병원[영등포구 여의대방로]",
                     "진료개시일": "2016.01.13",
                     "진료형태": "일반입원",
                     "처방회수": 0,
                     "본인부담금": "185,030",
                     "청구여부": false
                   },
                   {
                     "번호": "37",
                     "병·의원(약국)명칭": "바른병원[영등포구 여의대방로]",
                     "진료개시일": "2016.01.14",
                     "진료형태": "일반외래",
                     "처방회수": 0,
                     "본인부담금": "5,400",
                     "청구여부": false
                   },

                   {
                     "번호": "36",
                     "병·의원(약국)명칭": "고려대학교의과대학부속구로병원[구로구 구로동로]",
                     "진료개시일": "2019.01.04",
                     "진료형태": "일반외래",
                     "처방회수": 0,
                     "본인부담금": "53,800",
                     "청구여부": false
                   },
                   {
                     "번호": "35",
                     "병·의원(약국)명칭": "바른병원[영등포구 여의대방로]",
                     "진료개시일": "2019.01.06",
                     "진료형태": "일반외래",
                     "처방회수": 0,
                     "본인부담금": "3,700",
                     "청구여부": false
                   },
                   {
                     "번호": "34",
                     "병·의원(약국)명칭": "바른병원[영등포구 여의대방로]",
                     "진료개시일": "2018.12.31",
                     "진료형태": "일반외래",
                     "처방회수": 0,
                     "본인부담금": "3,700",
                     "청구여부": false
                   },
                   {
                     "번호": "33",
                     "병·의원(약국)명칭": "바른병원[영등포구 여의대방로]",
                     "진료개시일": "2018.12.29",
                     "진료형태": "일반외래",
                     "처방회수": 0,
                     "본인부담금": "6,700",
                     "청구여부": false
                   },
                  ]
      }
    }
  }

```

데이터 구조 잡기 결론:

1. 의료기관 방문 내역을 입력할 수 있다. 
  - 입원 때문에 기간 필드는 두 개가 필요하다.
  - 각 영수증은 보상 접수내역을 FK 로 가진다. n:1 관계임.
  - 기본 정보 : 영수증번호(pk), 영수증 발급일, 병원/약국 이름, 병원/약국 종류, 외래(통원)/입원(퇴원,중간), 기간1, 기간2  공유-최초사고일시, 공유-최초접수일, 최종-접수일 , 보상처리일
    - 영수증을 두 개 세개 끊어서 받을 수 있기 때문에 영수증 번호가 PK 가 되어야 함 
  - 항목 정보 : 진찰료, 검사료, 응급의학관리료 등
  - 금액 정보 : 납부금액, 급여본인부담액,비급여금액, 지급금액
     
  - 청구가능 : 가능,불가능
  - 접수 상태 : 미처리, 진행, 완료
  - (공유)보상처리 상태 : 미처리, 진행 , 완료
 
2. 보상처리내역 입력할 수 있다.
  - 기본정보 : 보상구분 - 상해/질병, 접수번호, 청구유형===외래(통원)/입원(퇴원,중간)
  - 보상접수 내용 - 질병/기타질환, 질병/심질환, 질병/기타질환
  - (공유)최종접수일시, 사고일시, 
  - 보상처리 상태 : 미처리, 진행, 완료
 - 담장자, 처리일, 보험상품, 보상담보, 지급보험금, 지금합계, 은행명, 은행계좌

작업중인 DB 스키마
https://dbdiagram.io/d/5cb58f4bf7c5bb70c72fa570
