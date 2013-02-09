function NoteController($scope) {
  $scope.notes = [];

  $scope.addNote = function() {
    $scope.notes.push({
      description : $scope.noteDescription,
      createdAt   : moment().format('MMMM Do YYYY, h:mm:ss a')
    })
    $scope.noteDescription = '';
  }
  
  $scope.deleteNote = function(index) {
    $scope.notes.splice(index, 1);
  }
}