# 뷰 관련 개인 연습장

뷰.js 관련 된 내용을 기록하는 연습장.

## 다이어그램(mermaid.js) 지원

````markdown
```mermaid
graph LR
    id1(첫째 박스)
    id2(둘째 박스)
    id1 --> id2
```
````

```mermaid
graph LR
    id1(첫째 박스)
    id2(둘째 박스)
    id1 --> id2
```

## 자바스크립트 콘솔 박스 지원

console.info 등 글씨가 아닌 건 출력이 잘 안 됨. 엣지에서 오작동.

<conso></conso>


## 커스텀 콘솔 박스 지원

내가 정의한 명령과 그 출력을 가지는 터미널 박스.

<v-custom-console :settings="overSettings" />

```js {mixin:true}
{
    data(){
        return {
            overSettings : {
            welcome: `콘솔 박스 준비 완료! support() 와 status() 가능!`,
            placeholder: '명령입력: ',
              commands: {
                support () {
                  return {
                    guide: 'Contact a client speciailist',
                    command () {
                      return 'Contacting a client solutions specialist, hold on...'
                    }
                  }
                },
                reboot () {
                  return {
                    guide: 'Restarts the program',
                    command () {
                      setTimeout(function () { location.reload() }, 1000)
                      return '<span style="color: red">Rebooting...</span>'
                    }
                  }
                }
              }
            }
        }
    }
}

```

