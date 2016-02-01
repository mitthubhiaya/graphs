var graphs = {};

 graphs.DirectedGraph = function () {
 	this.graph = {};
 };
graphs.DirectedGraph.prototype ={
 	addVertex : function (vertex){
 		this.graph[vertex]= [];
 	},
 	addEdge : function(from ,to){
 		this.graph[from] = this.graph[from] || [];
 		this.graph[from].push(to);

 	},
 	hasEdgeBetween : function(from ,to){
 		return this.graph[from]==to;
 	},

  order : function(){
      return Object.keys(this.graph).length;
  },
  size : function(){
      var result = 0;
      for(var index in this.graph) {
          result = result + this.graph[index].length;
      };
      return result;
  },
  pathBetween : function(from ,to,way){
      way = way ||[];
      if (from == to) return way.concat(from);
      for (var point in this.graph[from]){
        if(way.indexOf(this.graph[from][point]) == -1){
          var path = this.pathBetween(this.graph[from][point],to,way.concat(from))
          if (path[path.length -1 ]==to){
            return path;
          };
        }
      };
      return [];
  },
  farthestVertex : function(from,path){
		var path = path || [from];
		for(index in this.graph[from]){
			var vertex = this.graph[from][index];
			if(path.indexOf(vertex)==-1){
				return this.farthestVertex(vertex,path.concat(vertex));
			}
		}
		return from;
	},
  allPaths : function(from,to,visited,paths){
    var visited = visited ||[];
    var paths = paths || [];
    if(from == to) return visited.concat(from);
    for(var value= 0; value <this.graph[from].length; value++){
      var vertex = this.graph[from][value];
      if(visited.indexOf(vertex)==-1){
        var path= this.allPaths(vertex,to,visited.concat(from),paths);
        if(path.slice(-1)== to){
          paths.push(path);
        }
      }
    }
    return paths;
},
};

graphs.UndirectedGraph = function () {
 this.graph = {};
};
graphs.UndirectedGraph.prototype = {
  addVertex : function (vertex){
    this.graph[vertex]= [];
  },
  addEdge : function(from ,to){
    this.graph[from] = this.graph[from] || [];
    this.graph[from].push(to);
    this.graph[to] = this.graph[to] || [];
 		this.graph[to].push(from);

  },
  hasEdgeBetween : function(from ,to){
    return this.graph[from] && this.graph[from].indexOf(to)>=0;
  },
  order : function(){
      return Object.keys(this.graph).length;
  },
  size : function(){
      var result = 0;
      for(var index in this.graph) {
          result = result + this.graph[index].length;
      };
      return result/2;
  },
  pathBetween : function(from ,to,way){
      way = way ||[];
      if (from == to) return way.concat(from);
      for (var point in this.graph[from]){
        if(way.indexOf(this.graph[from][point]) == -1){
          var path = this.pathBetween(this.graph[from][point],to,way.concat(from))
          if (path[path.length -1 ]==to){
            return path;
          };
        }
      };
      return [];
  },
  farthestVertex : function(from,path){
  		var path = path || [from];
  		for(index in this.graph[from]){
  			var vertex = this.graph[from][index];
  			if(path.indexOf(vertex)==-1){
  				return this.farthestVertex(vertex,path.concat(vertex));
  			}
  		}
  		return from;
  	},
    allPaths : function(from,to,visited,paths){
      var visited = visited ||[];
      var paths = paths || [];
      if(from == to) return visited.concat(from);
      for(var value= 0; value <this.graph[from].length; value++){
        var vertex = this.graph[from][value];
        if(visited.indexOf(vertex)==-1){
          var path= this.allPaths(vertex,to,visited.concat(from),paths);
          if(path.slice(-1)== to){
            paths.push(path);
          }
        }
      }
      return paths;
  },
};
module.exports = graphs;
