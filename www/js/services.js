// services.js

angular.module('wcp.services',[])

.factory('wcp',function($http,PARSE_CREDENTIALS,$filter){
    return {
        getMatches:function(){
            return $http.get('https://api.parse.com/1/classes/Matches',{
                params:{
                		include:'away,home'
                },
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        getUpcoming:function(){
        	var currentTime = new Date();
        	currentTime.setHours(currentTime.getHours()-1);
        	currentTime = $filter('date')(currentTime, "yyyy-MM-ddTHH:mm:ss.sss");
      		currentTime = currentTime.toString() + 'Z';
      		//{"$lt": {"__type": "Date", "iso": datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ') }}})
        	return $http.get('https://api.parse.com/1/classes/Matches',{
        		params:{
        			include:'away,home',
        			where:'{"date":{"$gte":{"__type":"Date","iso":"'+currentTime+'"}}}',
        			limit: 16
        		},
        		headers:{
  						'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
              'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY
            }
          });
        },
        getResults:function(){
            return $http.get('https://api.parse.com/1/classes/Matches',{
            		params:{
                		include:'away,home',
                		where:'{"homeScore":{"$exists":true}}',
                		limit:16,
                		order:'date'
                },
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        getPool:function(id){
        		return $http.get('https://api.parse.com/1/classes/Teams/',{
        				params:{
        					where:'{"pool":"' + id + '"}'
        				},
        				headers:{
        						'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
        				}
        		});
        }
    }
})
.value('PARSE_CREDENTIALS',{
    APP_ID: '',
    REST_API_KEY:''
});