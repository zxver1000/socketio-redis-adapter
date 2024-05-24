

## 📒**소개 **

Redis에 Pub/Sub기능을 활용하여 확장 가능한 채팅 서버를 구현해 보았습니다.



.env파일 PORT와 public/script.js io port번호를 맞추면 사용하실수 있습니다.








## .env
```
PORT=3001(default)
REDIS_HOST=
REDIS_PORT=
```




## Result
---



![redis](https://github.com/zxver1000/socketio-redis-adapter/assets/78923992/2edd6892-372d-488a-8294-774eb10c7f59)



## 개선사항
- Redis의 장애가 생겼을 시 SPOF가 발생가능성이 있으므로 HA를 제공하기 위해 Redis-cluster로 추가 구현 예정
- 파티션기능과 채널 분리기능 구현 예정





## Reference
- [https://socket.io/docs/v4/redis-adapter/](https://socket.io/docs/v4/redis-adapter/)
- [https://docs.nestjs.com/websockets/adapter](https://docs.nestjs.com/websockets/adapter)
