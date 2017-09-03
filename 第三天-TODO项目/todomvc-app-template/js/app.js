(function (window) {
	// 'use strict';

	// Your starting point. Enjoy the ride!
	angular
		.module("app",[])
		.controller("ctrl",["$scope", "$location", "$log", function ($scope, $location, $log) {
			//列表显示功能
			$scope.todoList = [
				{id : 1, content : "吃饭", isChecked : false},
				{id : 2, content : "睡觉", isChecked : true},
				{id : 3, content : "打豆豆", isChecked : false},
				{id : 4, content : "豆豆是谁", isChecked : false},
			];
			
			var todos = $scope.todoList;
			//添加任务
			$scope.add = function ($event) {
				if($event.keyCode == 13 && $scope.todoContent){
					todos.push({
						id : todos[todos.length-1].id + 1,
						content : $scope.todoContent,
						ischecked : false
					});
					//添加完任务后清空
					$scope.todoContent = "";
				}
			}
			
			//删除任务
			$scope.del = function (id) {
				for(var i = 0; i < todos.length; i++) {
					//到匹配id的数据,执行删除
					if(id == todos[i].id){
						todos.splice(i, 1);
						break;
					}
				}
			}
			
			//修改任务
			//判断是修改哪条数据
			$scope.editId = -1
			$scope.edit = function (id) {
				$scope.editId = id;
			}
			
			//改修完毕后按回车键时
			$scope.updata = function ($event) {
				if($event.keyCode == 13){
					$scope.editId = -1
				}
			}
			
			//当全选发生变化时,改变所有item的选中状态
			$scope.toggleAll = function () {
				todos.forEach(function (v) {
					v.isChecked = $scope.isToggleAll;
				});
			}
			
			//当每个item的选项发生改变时,判断是否让全选按钮被选中
			$scope.singleTaskCheck = function () {
				
				$scope.isToggleAll = todos.every(function (v,i) {
					return v.isChecked;
				});
				//当有已经完成的任务时,Clear completed显示
				$scope.isHideClrBtn = todos.every(function (v, i) {
					return !v.isChecked;
				});
			}
			
			//点击清除所有已完成的任务
			$scope.clearAllComepleted = function () {
				//通过数组的filter方法，将所有未完成的任务取出来，存入tempArr
				var tempArr = todos.filter(function(v){
					return !v.isChecked;
				});
				//更新所显示的任务
				$scope.todoList = tempArr;
				todos = $scope.todoList;
				
				//当有已经完成的任务时,Clear completed显示
				$scope.isHideClrBtn = todos.every(function (v, i) {
					return !v.isChecked;
				});
			}
			
			//统计未完成的任务数
			$scope.getLeftCount = function () {
				//返回过滤后的数组长度
				return todos.filter(function (v) {
					return !v.isChecked;
				}).length;
			}
			
			//根据hash值判断筛选条件 all active Completed
			//保存location对象,
			$scope.location = $location;
			//通过$scope.$watch方法监视location.url()变化
			$scope.$watch("location.url()", function (newValue, oldValue) {
				//根据hash值的内容，对于页面展示的内容进行更改
				switch($location.url()){
					case "/active":
						$scope.status = false;
						break;
					case "/completed":
						$scope.status = true;
						break;
					default:
						$scope.status = undefined;
				}
			});
		}]);
})(window);
